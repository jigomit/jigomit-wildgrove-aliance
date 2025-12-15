<script setup>
import { defineAsyncComponent } from 'vue'
import HeroSection from '../components/home/HeroSection.vue'

// Lazy load below-the-fold sections for better FCP/LCP
const MissionSection = defineAsyncComponent(() => import('../components/home/MissionSection.vue'))
const ProgramsSection = defineAsyncComponent(() => import('../components/home/ProgramsSection.vue'))
const ImpactSection = defineAsyncComponent(() => import('../components/home/ImpactSection.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('../components/home/TestimonialsSection.vue'))
const CTASection = defineAsyncComponent(() => import('../components/home/CTASection.vue'))
</script>

<template>
  <div class="home-page">
    <HeroSection />
    <MissionSection />
    <ProgramsSection />
    <ImpactSection />
    <TestimonialsSection />
    <CTASection />
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>
