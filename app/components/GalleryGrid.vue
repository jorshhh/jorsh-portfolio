<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface GalleryItem {
  image?: string
  url?: string
  title?: string
  caption?: string
  description?: string
  year?: number
  aspect?: 'landscape' | 'portrait'
}

const props = defineProps<{
  items: GalleryItem[]
  columns?: 2 | 3
}>()

const normalizedItems = computed(() =>
  props.items.map((item, i) => ({
    index: i,
    src: item.image || item.url || '',
    label: item.title || item.caption || item.description || '',
    text: item.description || item.caption || '',
    year: item.year,
  }))
)

// ── Column layout ──────────────────────────────────────────────────────────

const columnCount = computed(() => props.columns ?? 2)

const TWO_COL_OPTIONS = [[6, 6], [7, 5], [5, 7]] as const
const THREE_COL_OPTIONS = [[4, 4, 4], [5, 4, 3], [3, 5, 4], [4, 3, 5], [5, 3, 4]] as const

// Full class strings must appear as literals for Tailwind's scanner.
const colSpanClass: Record<number, string> = {
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  12: 'md:col-span-12',
}

function pick<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty array')
  }

  const randomIndex = Math.floor(Math.random() * items.length)
  const selectedItem = items[randomIndex]

  if (selectedItem === undefined) {
    throw new Error('Failed to pick an item')
  }

  return selectedItem
}

function spansForRow(itemCount: number, cols: number): number[] {
  if (cols === 2) {
    return itemCount === 2 ? [...pick(TWO_COL_OPTIONS)] : [12]
  }
  // cols === 3
  if (itemCount === 3) return [...pick(THREE_COL_OPTIONS)]
  if (itemCount === 2) return [6, 6]
  return [12]
}

const rowSpans = ref<number[][]>([])

function generateSpans() {
  const items = normalizedItems.value
  const cols = columnCount.value
  const result: number[][] = []
  for (let i = 0; i < items.length; i += cols) {
    result.push(spansForRow(items.slice(i, i + cols).length, cols))
  }
  rowSpans.value = result
}

// flush: 'sync' keeps rowSpans in step with columnCount before re-render
watch([() => normalizedItems.value.length, columnCount], generateSpans, {
  immediate: true,
  flush: 'sync',
})

const rows = computed(() => {
  const items = normalizedItems.value
  const cols = columnCount.value
  return Array.from({ length: Math.ceil(items.length / cols) }, (_, rowIdx) => {
    const rowItems = items.slice(rowIdx * cols, (rowIdx + 1) * cols)
    const spans = rowSpans.value[rowIdx] ?? Array(rowItems.length).fill(Math.floor(12 / cols))
    return rowItems.map((item, j) => ({ ...item, span: spans[j] ?? 6 }))
  })
})

// ── Lightbox ───────────────────────────────────────────────────────────────

const activeImageIndex = ref<number | null>(null)
const isZoomed = ref(false)

const activeItem = computed(() =>
  activeImageIndex.value !== null ? normalizedItems.value[activeImageIndex.value] : null
)

const openLightbox = (index: number) => {
  activeImageIndex.value = index
  isZoomed.value = false
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  activeImageIndex.value = null
  isZoomed.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (activeImageIndex.value === null) return
  isZoomed.value = false
  activeImageIndex.value = (activeImageIndex.value + 1) % normalizedItems.value.length
}

const prevImage = () => {
  if (activeImageIndex.value === null) return
  isZoomed.value = false
  activeImageIndex.value =
    (activeImageIndex.value - 1 + normalizedItems.value.length) % normalizedItems.value.length
}

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
}

const handleKeydown = (e: KeyboardEvent) => {
  if (activeImageIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="max-w-[1600px] mx-auto">

    <!-- Grid -->
    <div class="flex flex-col gap-[15px] md:gap-[20px]">
      <div
        v-for="(row, rowIdx) in rows"
        :key="`${columnCount}-${rowIdx}`"
        class="grid grid-cols-1 md:grid-cols-12 gap-[15px] md:gap-[20px] md:h-[450px] lg:h-[550px] xl:h-[650px]"
      >
        <div
          v-for="item in row"
          :key="item.index"
          class="h-[250px] sm:h-[350px] md:h-full overflow-hidden group bg-neutral-100 cursor-pointer relative"
          :class="colSpanClass[item.span] ?? 'md:col-span-6'"
          @click="openLightbox(item.index)"
        >
          <img
            :src="item.src"
            :alt="item.label"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Transition name="fade">
      <div
        v-if="activeItem !== null"
        class="fixed inset-0 bg-white z-50 flex flex-col justify-between"
      >
        <!-- Header -->
        <div class="px-6 md:px-12 py-6 flex items-center justify-between text-black bg-white">
          <div class="text-sm uppercase tracking-widest font-bold">
            {{ activeItem?.label }}
          </div>
          <div class="flex items-center gap-6">
            <button
              @click="toggleZoom"
              class="text-xs uppercase tracking-wider font-semibold hover:opacity-60 transition-opacity"
              aria-label="Toggle Zoom"
            >
              {{ isZoomed ? 'Zoom Out' : 'Zoom In' }}
            </button>
            <button
              @click="closeLightbox"
              class="text-sm uppercase tracking-widest font-bold hover:opacity-60 transition-opacity"
              aria-label="Close"
            >
              Close ✕
            </button>
          </div>
        </div>

        <!-- Image Area -->
        <div class="flex-grow flex items-center justify-center relative px-6 md:px-24 overflow-hidden bg-white select-none">
          <button
            @click="prevImage"
            class="absolute left-6 md:left-12 text-2xl md:text-3xl font-light hover:opacity-40 transition-opacity p-4 z-10"
            aria-label="Previous Image"
          >
            ←
          </button>

          <div
            class="w-full h-full flex items-center justify-center transition-all duration-300"
            :class="isZoomed ? 'overflow-auto cursor-zoom-out' : 'cursor-zoom-in'"
            @click="toggleZoom"
          >
            <img
              :src="activeItem?.src"
              :alt="activeItem?.label"
              class="max-w-full max-h-[75vh] object-contain transition-transform duration-300"
              :class="isZoomed ? 'scale-125' : 'scale-100'"
            />
          </div>

          <button
            @click="nextImage"
            class="absolute right-6 md:right-12 text-2xl md:text-3xl font-light hover:opacity-40 transition-opacity p-4 z-10"
            aria-label="Next Image"
          >
            →
          </button>
        </div>

        <!-- Footer -->
        <div class="px-6 md:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-wider uppercase text-neutral-400 bg-white border-t border-neutral-100">
          <div>{{ activeItem?.text }}</div>
          <div class="flex items-center gap-4">
            <span>{{ (activeImageIndex ?? 0) + 1 }} / {{ normalizedItems.length }}</span>
            <template v-if="activeItem?.year">
              <span>·</span>
              <span>{{ activeItem?.year }}</span>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
