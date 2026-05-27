<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { galleries } from '../../data'

const route = useRoute()
const galleryId = route.params.id as string

const gallery = computed(() => {
  return galleries.find((g) => g.id === galleryId)
})

const activeImageIndex = ref<number | null>(null)
const isZoomed = ref(false)

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
  if (activeImageIndex.value === null || !gallery.value) return
  isZoomed.value = false
  activeImageIndex.value = (activeImageIndex.value + 1) % gallery.value.images.length
}

const prevImage = () => {
  if (activeImageIndex.value === null || !gallery.value) return
  isZoomed.value = false
  activeImageIndex.value = (activeImageIndex.value - 1 + gallery.value.images.length) % gallery.value.images.length
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

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="max-w-[1400px] mx-auto py-8">
    
    <!-- Gallery Not Found -->
    <div v-if="!gallery" class="text-center py-20">
      <h1 class="text-2xl font-black uppercase tracking-widest mb-6">Gallery Not Found</h1>
      <p class="text-neutral-500 mb-8 font-light">The gallery session you are looking for does not exist.</p>
      <NuxtLink to="/galleries" class="text-sm uppercase tracking-widest font-bold underline underline-offset-4">
        Back to Galleries
      </NuxtLink>
    </div>

    <!-- Gallery Detail view -->
    <div v-else>
      <!-- Back Link -->
      <NuxtLink 
        to="/galleries" 
        class="text-xs uppercase tracking-widest font-bold mb-12 flex items-center gap-2 hover:opacity-60 transition-opacity"
      >
        ← Back to Galleries
      </NuxtLink>

      <!-- Gallery Header -->
      <div class="mb-16 md:mb-24 flex flex-col items-start max-w-2xl">
        <div class="flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-400 mb-3">
          <span>{{ gallery.year }}</span>
          <span>·</span>
          <span>{{ gallery.tags.join(', ') }}</span>
        </div>
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
          {{ gallery.title }}
        </h1>
        <p class="text-neutral-600 text-base md:text-lg leading-relaxed font-light">
          {{ gallery.description }}
        </p>
      </div>

      <!-- Image Display (Clean, varying ratios grid to display photos) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
        <div 
          v-for="(img, idx) in gallery.images" 
          :key="idx"
          class="overflow-hidden bg-neutral-100 group cursor-pointer relative"
          :class="img.aspect === 'portrait' ? 'lg:col-span-4 aspect-[3/4]' : 'lg:col-span-8 aspect-[4/3]'"
          @click="openLightbox(idx)"
        >
          <img 
            :src="img.url" 
            :alt="img.caption" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <!-- Hover caption -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <p class="text-white text-xs uppercase tracking-wider font-medium">
              {{ img.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Transition name="fade">
      <div 
        v-if="activeImageIndex !== null && gallery" 
        class="fixed inset-0 bg-white z-50 flex flex-col justify-between"
      >
        <!-- Lightbox Header / Controls -->
        <div class="px-6 md:px-12 py-6 flex items-center justify-between text-black bg-white">
          <div class="text-sm uppercase tracking-widest font-bold">
            {{ gallery.images[activeImageIndex].caption }}
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

        <!-- Main Lightbox Image -->
        <div class="flex-grow flex items-center justify-center relative px-6 md:px-24 overflow-hidden bg-white select-none">
          <!-- Left Navigation Arrow -->
          <button 
            @click="prevImage" 
            class="absolute left-6 md:left-12 text-2xl md:text-3xl font-light hover:opacity-40 transition-opacity p-4 z-10"
            aria-label="Previous Image"
          >
            ←
          </button>

          <!-- Image Wrapper with optional Zoom scale -->
          <div 
            class="w-full h-full flex items-center justify-center transition-all duration-300"
            :class="isZoomed ? 'overflow-auto cursor-zoom-out' : 'cursor-zoom-in'"
            @click="toggleZoom"
          >
            <img 
              :src="gallery.images[activeImageIndex].url" 
              :alt="gallery.images[activeImageIndex].caption" 
              class="max-w-full max-h-[75vh] object-contain transition-transform duration-300"
              :class="isZoomed ? 'scale-125' : 'scale-100'"
            />
          </div>

          <!-- Right Navigation Arrow -->
          <button 
            @click="nextImage" 
            class="absolute right-6 md:right-12 text-2xl md:text-3xl font-light hover:opacity-40 transition-opacity p-4 z-10"
            aria-label="Next Image"
          >
            →
          </button>
        </div>

        <!-- Lightbox Footer -->
        <div class="px-6 md:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-wider uppercase text-neutral-400 bg-white border-t border-neutral-100">
          <div>
            {{ gallery.title }} Gallery
          </div>
          <div class="flex items-center gap-4">
            <span>{{ activeImageIndex + 1 }} / {{ gallery.images.length }}</span>
            <span>·</span>
            <span>{{ gallery.year }}</span>
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
