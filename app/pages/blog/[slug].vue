<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { posts } from '../../data'

const route = useRoute()
const slug = route.params.slug as string

const post = computed(() => {
  return posts.find((p) => p.id === slug)
})

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<template>
  <div class="max-w-[800px] mx-auto py-12">
    <!-- Post Not Found -->
    <div v-if="!post" class="text-center py-20">
      <h1 class="text-2xl font-black uppercase tracking-widest mb-6">Post Not Found</h1>
      <p class="text-neutral-500 mb-8 font-light">The article you are looking for does not exist.</p>
      <NuxtLink to="/blog" class="text-sm uppercase tracking-widest font-bold underline underline-offset-4">
        Back to Blog
      </NuxtLink>
    </div>

    <!-- Full Post View -->
    <article v-else class="flex flex-col items-center">
      <!-- Back Link -->
      <NuxtLink 
        to="/blog" 
        class="self-start text-xs uppercase tracking-widest font-bold mb-12 flex items-center gap-2 hover:opacity-60 transition-opacity"
      >
        ← Back to Blog
      </NuxtLink>

      <!-- Date -->
      <time class="text-xs md:text-sm text-neutral-400 tracking-wider uppercase mb-4">
        {{ formatDate(post.date) }}
      </time>

      <!-- Title -->
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-center mb-8">
        {{ post.title }}
      </h1>

      <!-- Meta Info -->
      <div class="flex items-center gap-4 text-xs uppercase tracking-wider text-neutral-400 mb-12">
        <span>{{ post.readingTime }} Min Read</span>
        <span>·</span>
        <span>Tags: {{ post.tags.join(', ') }}</span>
      </div>

      <!-- Article Body -->
      <div class="w-full text-neutral-800 text-base md:text-lg leading-relaxed font-light space-y-6 md:space-y-8 whitespace-pre-line">
        {{ post.body }}
      </div>
    </article>
  </div>
</template>
