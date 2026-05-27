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

// ── Masonry State & ResizeObserver ─────────────────────────────────────────

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const isMounted = ref(false)
const columnCount = ref<2 | 3>(2)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  isMounted.value = true
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use contentRect width
        containerWidth.value = entry.contentRect.width
      }
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

// ── Desandro Masonry Layout Algorithm ──────────────────────────────────────

const gap = 20 // Gap in pixels between items

const activeCols = computed(() => {
  if (!isMounted.value || containerWidth.value === 0) return 2
  if (containerWidth.value < 768) return 1 // Stack into 1 column on mobile
  return columnCount.value
})

const itemAspectRatios = computed(() => {
  return normalizedItems.value.map((item) => {
    if (item.aspect === 'portrait') return 0.75
    if (item.aspect === 'landscape') return 1.5
    
    // Guess based on descriptions or fallback to alternation
    const text = (item.text + " " + item.label).toLowerCase()
    if (text.includes('portrait') || text.includes('vertical')) return 0.75
    if (text.includes('landscape') || text.includes('misty') || text.includes('ocean')) return 1.5
    
    return item.index % 2 === 0 ? 1.5 : 0.75
  })
})

const masonryItems = computed(() => {
  if (!isMounted.value || containerWidth.value === 0) {
    return normalizedItems.value.map((item) => ({
      ...item,
      style: {} as Record<string, string>,
    }))
  }

  const cols = activeCols.value
  const colWidth = (containerWidth.value - (cols - 1) * gap) / cols
  const colHeights = Array(cols).fill(0)

  return normalizedItems.value.map((item, idx) => {
    const aspect = itemAspectRatios.value[idx] ?? 1.2
    const height = colWidth / aspect

    // Find index of column with minimum height (Desandro's shortest-column logic)
    let minColIdx = 0
    let minHeight = colHeights[0]
    for (let k = 1; k < cols; k++) {
      if (colHeights[k] < minHeight) {
        minHeight = colHeights[k]
        minColIdx = k
      }
    }

    const left = minColIdx * (colWidth + gap)
    const top = colHeights[minColIdx]

    // Update the column height
    colHeights[minColIdx] += height + gap

    return {
      ...item,
      style: {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${colWidth}px`,
        height: `${height}px`,
      } as Record<string, string>,
    }
  })
})

const computedContainerHeight = computed(() => {
  if (!isMounted.value || containerWidth.value === 0) return 0
  const cols = activeCols.value
  const colWidth = (containerWidth.value - (cols - 1) * gap) / cols
  const colHeights = Array(cols).fill(0)

  normalizedItems.value.forEach((_, idx) => {
    const aspect = itemAspectRatios.value[idx] ?? 1.2
    const height = colWidth / aspect

    let minColIdx = 0
    let minHeight = colHeights[0]
    for (let k = 1; k < cols; k++) {
      if (colHeights[k] < minHeight) {
        minHeight = colHeights[k]
        minColIdx = k
      }
    }
    colHeights[minColIdx] += height + gap
  })

  const maxVal = Math.max(...colHeights)
  return maxVal > 0 ? maxVal - gap : 0
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
    <!-- Grid style toggle -->
    <div class="flex justify-end items-center gap-2 mb-6 text-xs uppercase tracking-widest select-none">
      <span class="text-neutral-400">Layout:</span>
      <button
        @click="columnCount = 2"
        class="transition-colors duration-200"
        :class="columnCount === 2
          ? 'underline underline-offset-4 font-bold text-black'
          : 'text-neutral-400 hover:text-black'"
        aria-pressed="columnCount === 2"
      >
        2 Col
      </button>
      <span class="text-neutral-300">/</span>
      <button
        @click="columnCount = 3"
        class="transition-colors duration-200"
        :class="columnCount === 3
          ? 'underline underline-offset-4 font-bold text-black'
          : 'text-neutral-400 hover:text-black'"
        aria-pressed="columnCount === 3"
      >
        3 Col
      </button>
    </div>

    <!-- SSR Fallback Grid (SEO-friendly, static layout) -->
    <div v-if="!isMounted" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in normalizedItems"
        :key="item.index"
        class="overflow-hidden bg-neutral-100 aspect-square"
      >
        <img :src="item.src" :alt="item.label" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Absolute Positioned DeSandro-style Masonry Grid -->
    <div
      v-else
      ref="containerRef"
      class="relative w-full transition-all duration-500 ease-out"
      :style="{ height: `${computedContainerHeight}px` }"
    >
      <div
        v-for="item in masonryItems"
        :key="item.index"
        class="overflow-hidden group bg-neutral-100 cursor-pointer absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        :style="item.style"
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
