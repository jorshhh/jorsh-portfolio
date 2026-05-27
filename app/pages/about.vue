<script setup lang="ts">
import { portfolio } from '../data'
</script>

<template>
  <div class="max-w-[1600px] mx-auto min-h-[60vh] flex items-center">
    <!-- Asymmetric 2-Column About Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-12">
      <!-- Left Column: Beautiful Empty Whitespace -->
      <div class="hidden lg:block"></div>

      <!-- Right Column: Solid Light Gray Block with Content -->
      <div class="bg-neutral-50 border border-neutral-100 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
        <!-- Heading -->
        <h1 class="text-4xl md:text-5xl font-black tracking-widest uppercase mb-8 md:mb-12">
          {{ portfolio.name }}
        </h1>
        
        <!-- About Paragraphs -->
        <div class="text-neutral-800 text-base md:text-lg leading-relaxed space-y-6 max-w-xl font-light">
          <p>
            {{ portfolio.bio }}
          </p>
          <p>
            With a signature eye for negative space, subtle tones, and balanced geometry, my work serves clients worldwide across publishing, design agencies, and architectural studios. 
          </p>
          <p>
            Every project begins with a conversation and a blank canvas, aiming to create digital and physical narratives that withstand the test of time.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
