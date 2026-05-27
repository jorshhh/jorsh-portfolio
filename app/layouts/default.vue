<script setup lang="ts">
import { useRoute } from 'vue-router'
import { portfolio } from '../data'

const route = useRoute()

const isLinkActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-screen bg-white text-black font-sans flex flex-col selection:bg-neutral-100">
    <!-- Header -->
    <header class="px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl md:text-2xl font-black tracking-widest hover:opacity-75 transition-opacity">
          {{ portfolio.name }}
        </NuxtLink>
        <!-- Nav Links -->
        <nav class="flex items-center gap-6 md:gap-8 text-sm tracking-wider uppercase">
          <NuxtLink 
            to="/galleries" 
            class="transition-all py-1"
            :class="isLinkActive('/galleries') ? 'border-b-2 border-black font-semibold' : 'hover:opacity-60'"
          >
            Galleries
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="transition-all py-1"
            :class="isLinkActive('/about') ? 'border-b-2 border-black font-semibold' : 'hover:opacity-60'"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="transition-all py-1"
            :class="isLinkActive('/contact') ? 'border-b-2 border-black font-semibold' : 'hover:opacity-60'"
          >
            Contact
          </NuxtLink>
        </nav>
      </div>

      <!-- Social Icons (Header) -->
      <div class="flex items-center gap-6 text-black">
        <a :href="portfolio.social.instagram" target="_blank" rel="noopener noreferrer" class="hover:opacity-60 transition-opacity" aria-label="Instagram">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
        <a :href="portfolio.social.twitter" target="_blank" rel="noopener noreferrer" class="hover:opacity-60 transition-opacity" aria-label="Twitter">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-grow px-6 md:px-12 py-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="px-6 md:px-12 py-12 md:py-20 mt-32 border-t border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
      <div class="font-black tracking-widest">
        {{ portfolio.name }}
      </div>
      <div class="flex items-center gap-6 md:gap-8">
        <div class="flex items-center gap-4 text-black">
          <a :href="portfolio.social.instagram" target="_blank" rel="noopener noreferrer" class="hover:opacity-60 transition-opacity" aria-label="Instagram">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a :href="portfolio.social.twitter" target="_blank" rel="noopener noreferrer" class="hover:opacity-60 transition-opacity" aria-label="Twitter">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
        <span class="text-xs text-neutral-400">Made with Nuxt & Tailwind</span>
      </div>
    </footer>
  </div>
</template>
