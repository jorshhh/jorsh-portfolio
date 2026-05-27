<script setup lang="ts">
import { portfolio } from '../data'
</script>

<template>
  <div class="max-w-[1200px] mx-auto min-h-[50vh] flex items-center py-12">
    <!-- 2-Column Contact Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full">
      
      <!-- Left Column (General Inquiry) -->
      <div class="flex flex-col items-start justify-center">
        <!-- Heading -->
        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6">
          Contact
        </h1>
        <!-- Description -->
        <p class="text-neutral-600 text-sm md:text-base leading-relaxed mb-8 font-light max-w-md">
          For general inquiries, project bookings, or just to say hello, feel free to drop me a message. Let's build something exceptional together.
        </p>
        <!-- Outlined Button CTA -->
        <a 
          :href="`mailto:${portfolio.email}`"
          class="inline-block px-10 py-4 border-2 border-black text-xs uppercase tracking-widest font-black hover:bg-black hover:text-white transition-all duration-300"
        >
          Email Me
        </a>
      </div>

      <!-- Right Column (Specific representation info) -->
      <div class="flex flex-col justify-center space-y-12">
        <!-- Representation -->
        <div>
          <h2 class="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
            Representation
          </h2>
          <p class="text-base md:text-lg font-black tracking-wide">
            <a :href="`mailto:${portfolio.representationEmail}`" class="hover:opacity-60 transition-opacity">
              {{ portfolio.representationEmail }}
            </a>
          </p>
        </div>

        <!-- Press Inquiries -->
        <div>
          <h2 class="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
            Press Inquiries
          </h2>
          <p class="text-base md:text-lg font-black tracking-wide mb-4">
            <a :href="`mailto:${portfolio.pressEmail}`" class="hover:opacity-60 transition-opacity">
              {{ portfolio.pressEmail }}
            </a>
          </p>
          
          <!-- Social Link shortcuts in text -->
          <div class="flex items-center gap-4 pt-2 text-xs uppercase tracking-widest font-bold">
            <a :href="portfolio.social.instagram" target="_blank" rel="noopener noreferrer" class="hover:underline">
              Instagram
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
