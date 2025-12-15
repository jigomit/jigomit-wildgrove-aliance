<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import MissionSection from '../components/home/MissionSection.vue'
import ProgramsSection from '../components/home/ProgramsSection.vue'
import ImpactSection from '../components/home/ImpactSection.vue'
import TestimonialsSection from '../components/home/TestimonialsSection.vue'
import CTASection from '../components/home/CTASection.vue'
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
