<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { projects } from '../data'

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
  if (activeImageIndex.value === null) return
  isZoomed.value = false
  activeImageIndex.value = (activeImageIndex.value + 1) % projects.length
}

const prevImage = () => {
  if (activeImageIndex.value === null) return
  isZoomed.value = false
  activeImageIndex.value = (activeImageIndex.value - 1 + projects.length) % projects.length
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
  <div class="max-w-[1600px] mx-auto">
    <!-- Asymmetric alternating image grid -->
    <div class="flex flex-col gap-[15px] md:gap-[20px]">
      
      <!-- Row 1: Left Landscape (60%), Right Portrait (40%) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-[15px] md:gap-[20px]">
        <div class="md:col-span-7 aspect-[3/2] overflow-hidden group bg-neutral-100 cursor-pointer" @click="openLightbox(0)">
          <img 
            :src="projects[0].image" 
            :alt="projects[0].title" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="md:col-span-5 aspect-[3/4] overflow-hidden group bg-neutral-100 cursor-pointer" @click="openLightbox(1)">
          <img 
            :src="projects[1].image" 
            :alt="projects[1].title" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Row 2: Left Portrait (40%), Right Landscape (60%) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-[15px] md:gap-[20px]">
        <div class="md:col-span-5 aspect-[3/4] overflow-hidden group bg-neutral-100 cursor-pointer" @click="openLightbox(2)">
          <img 
            :src="projects[2].image" 
            :alt="projects[2].title" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="md:col-span-7 aspect-[3/2] overflow-hidden group bg-neutral-100 cursor-pointer" @click="openLightbox(3)">
          <img 
            :src="projects[3].image" 
            :alt="projects[3].title" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Row 3: Left Landscape (60%), Right Portrait (40%) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-[15px] md:gap-[20px]">
        <div class="md:col-span-7 aspect-[3/2] overflow-hidden group bg-neutral-100 cursor-pointer" @click="openLightbox(4)">
          <img 
            :src="projects[4].image" 
            :alt="projects[4].title" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="md:col-span-5 aspect-[3/4] overflow-hidden group bg-neutral-100 cursor-pointer" @click="openLightbox(5)">
          <img 
            :src="projects[5].image" 
            :alt="projects[5].title" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

    </div>

    <!-- Lightbox Modal -->
    <Transition name="fade">
      <div 
        v-if="activeImageIndex !== null" 
        class="fixed inset-0 bg-white z-50 flex flex-col justify-between"
      >
        <!-- Lightbox Header / Controls -->
        <div class="px-6 md:px-12 py-6 flex items-center justify-between text-black bg-white">
          <div class="text-sm uppercase tracking-widest font-bold">
            {{ projects[activeImageIndex].title }}
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
              :src="projects[activeImageIndex].image" 
              :alt="projects[activeImageIndex].title" 
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
            {{ projects[activeImageIndex].description }}
          </div>
          <div class="flex items-center gap-4">
            <span>{{ activeImageIndex + 1 }} / {{ projects.length }}</span>
            <span>·</span>
            <span>{{ projects[activeImageIndex].year }}</span>
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
