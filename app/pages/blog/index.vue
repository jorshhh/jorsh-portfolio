<script setup lang="ts">
import { posts } from '../../data'

// Format date to a cleaner readable format (e.g. May 28, 2019)
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<template>
  <div class="max-w-[800px] mx-auto py-12">
    <!-- Page Title -->
    <h1 class="text-3xl md:text-4xl font-black uppercase tracking-widest text-center mb-16 md:mb-24">
      Blog
    </h1>

    <!-- Centered Single-Column Blog Feed -->
    <div class="space-y-24 md:space-y-36">
      <article 
        v-for="post in posts" 
        :key="post.id"
        class="flex flex-col items-center text-center group"
      >
        <!-- Date -->
        <time class="text-xs md:text-sm text-neutral-400 tracking-wider uppercase mb-4">
          {{ formatDate(post.date) }}
        </time>

        <!-- Title -->
        <h2 class="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 hover:opacity-75 transition-opacity">
          <NuxtLink :to="`/blog/${post.id}`">
            {{ post.title }}
          </NuxtLink>
        </h2>

        <!-- Excerpt -->
        <p class="text-neutral-600 text-sm md:text-base leading-relaxed max-w-xl mb-6 font-light">
          {{ post.excerpt }}
        </p>

        <!-- Read More Link -->
        <NuxtLink 
          :to="`/blog/${post.id}`"
          class="text-xs md:text-sm uppercase tracking-widest font-bold underline decoration-neutral-300 underline-offset-4 hover:decoration-black transition-all"
        >
          Read More
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
