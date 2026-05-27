<script setup lang="ts">
import { projects, portfolio } from '../data'
</script>

<template>
  <GalleryGrid :items="projects" :columns="portfolio.gridColumns" />
</template>
