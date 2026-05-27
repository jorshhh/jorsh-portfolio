<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
}>()

const normalizedItems = computed(() =>
  props.items.map((item, i) => ({
    index: i,
    src: item.image || item.url || '',
    label: item.title || item.caption || item.description || '',
    text: item.description || item.caption || '',
    year: item.year,
    aspect: item.aspect,
  }))
)

const rows = computed(() => {
  const result: Array<Array<typeof normalizedItems.value[0] & { isWide: boolean }>> = []
  const flat = normalizedItems.value
  for (let i = 0; i < flat.length; i += 2) {
    const rowIndex = result.length
    const isEvenRow = rowIndex % 2 === 0
    const pair = flat.slice(i, i + 2).map((item, j) => {
      const isWide = item.aspect
        ? item.aspect === 'landscape'
        : isEvenRow ? j === 0 : j === 1
      return { ...item, isWide }
    })
    result.push(pair)
  }
  return result
})

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
  activeImageIndex.value = (activeImageIndex.value - 1 + normalizedItems.value.length) % normalizedItems.value.length
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
    <div class="flex flex-col gap-[15px] md:gap-[20px]">
      <div
        v-for="(row, rowIdx) in rows"
        :key="rowIdx"
        class="grid grid-cols-1 md:grid-cols-12 gap-[15px] md:gap-[20px] md:h-[450px] lg:h-[550px] xl:h-[650px]"
      >
        <div
          v-for="item in row"
          :key="item.index"
          class="h-[250px] sm:h-[350px] md:h-full overflow-hidden group bg-neutral-100 cursor-pointer relative"
          :class="item.isWide ? 'md:col-span-7' : 'md:col-span-5'"
          @click="openLightbox(item.index)"
        >
          <img
            :src="item.src"
            :alt="item.label"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div
            v-if="item.text"
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
          >
            <p class="text-white text-xs uppercase tracking-wider font-medium">{{ item.text }}</p>
          </div>
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
            {{ activeItem.label }}
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
              :src="activeItem.src"
              :alt="activeItem.label"
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
          <div>{{ activeItem.text }}</div>
          <div class="flex items-center gap-4">
            <span>{{ (activeImageIndex ?? 0) + 1 }} / {{ normalizedItems.length }}</span>
            <template v-if="activeItem.year">
              <span>·</span>
              <span>{{ activeItem.year }}</span>
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
