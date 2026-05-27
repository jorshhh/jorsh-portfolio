<script setup lang="ts">
import { galleries } from '../../data'
</script>

<template>
  <div class="max-w-[1400px] mx-auto py-12">
    <!-- Page Header -->
    <div class="text-center mb-16 md:mb-24">
      <h1 class="text-3xl md:text-4xl font-black uppercase tracking-widest mb-4">
        Galleries
      </h1>
      <p class="text-neutral-500 text-sm tracking-wider uppercase">
        Curated sessions and travel diaries
      </p>
    </div>

    <!-- Galleries Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
      <div 
        v-for="gallery in galleries" 
        :key="gallery.id"
        class="flex flex-col group"
      >
        <!-- Cover Image Container -->
        <NuxtLink 
          :to="`/galleries/${gallery.id}`"
          class="aspect-[4/5] w-full overflow-hidden bg-neutral-100 mb-6 block relative"
        >
          <img 
            :src="gallery.coverImage" 
            :alt="gallery.title" 
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </NuxtLink>

        <!-- Gallery Details -->
        <div class="flex flex-col items-start">
          <div class="flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-400 mb-2">
            <span>{{ gallery.year }}</span>
            <span>·</span>
            <span>{{ gallery.images.length }} Photos</span>
          </div>
          
          <h2 class="text-2xl font-black uppercase tracking-tight mb-3">
            <NuxtLink 
              :to="`/galleries/${gallery.id}`"
              class="hover:opacity-75 transition-opacity"
            >
              {{ gallery.title }}
            </NuxtLink>
          </h2>

          <p class="text-neutral-600 text-sm leading-relaxed font-light mb-4 max-w-sm">
            {{ gallery.description }}
          </p>

          <!-- View Gallery Link -->
          <NuxtLink 
            :to="`/galleries/${gallery.id}`"
            class="text-xs uppercase tracking-widest font-bold underline decoration-neutral-300 underline-offset-4 hover:decoration-black transition-all"
          >
            Explore Gallery
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
