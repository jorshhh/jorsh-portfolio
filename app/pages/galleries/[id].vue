<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { galleries } from '../../data'

const route = useRoute()
const galleryId = route.params.id as string

const gallery = computed(() => galleries.find((g) => g.id === galleryId))
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

    <!-- Gallery Detail -->
    <div v-else>
      <NuxtLink
        to="/galleries"
        class="text-xs uppercase tracking-widest font-bold mb-12 flex items-center gap-2 hover:opacity-60 transition-opacity"
      >
        ← Back to Galleries
      </NuxtLink>

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

      <GalleryGrid :items="gallery.images" />
    </div>

  </div>
</template>
