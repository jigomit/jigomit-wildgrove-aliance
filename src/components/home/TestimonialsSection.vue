<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../common/SectionHeader.vue'
import TestimonialSlider from '../common/TestimonialSlider.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)

onMounted(() => {
  // Header animation
  gsap.fromTo('.testimonials-section .section-header',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } }
  )

  // Background shapes
  gsap.fromTo('.bg-shape',
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 0.5, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } }
  )

  // Testimonial slider
  gsap.fromTo('.testimonial-slider',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.5, delay: 0.2, scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' } }
  )

  // Trust badges
  gsap.fromTo('.trust-label',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, scrollTrigger: { trigger: '.trust-badges', start: 'top 85%' } }
  )
  gsap.fromTo('.badge',
    { opacity: 0, scale: 0.8, y: 15 },
    { opacity: 0.6, scale: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.badges-grid', start: 'top 85%' } }
  )
})
</script>

<template>
  <section ref="sectionRef" class="testimonials-section section">
    <div class="testimonials-bg">
      <div class="bg-shape bg-shape--1"></div>
      <div class="bg-shape bg-shape--2"></div>
    </div>

    <div class="container">
      <SectionHeader
        subtitle="Testimonials"
        title="Voices of Conservation"
        description="Hear from the passionate individuals, scientists, and partners who have witnessed the impact of our work firsthand."
      />

      <TestimonialSlider />

      <!-- Trust Badges -->
      <div class="trust-badges">
        <p class="trust-label">Trusted & Accredited By</p>
        <div class="badges-grid">
          <div class="badge">
            <svg viewBox="0 0 100 40" class="badge-logo">
              <rect width="100" height="40" rx="4" fill="rgba(74, 124, 89, 0.1)"/>
              <text x="50" y="25" text-anchor="middle" fill="#4A7C59" font-size="12" font-weight="600">WWF Partner</text>
            </svg>
          </div>
          <div class="badge">
            <svg viewBox="0 0 100 40" class="badge-logo">
              <rect width="100" height="40" rx="4" fill="rgba(74, 124, 89, 0.1)"/>
              <text x="50" y="25" text-anchor="middle" fill="#4A7C59" font-size="12" font-weight="600">IUCN Member</text>
            </svg>
          </div>
          <div class="badge">
            <svg viewBox="0 0 100 40" class="badge-logo">
              <rect width="100" height="40" rx="4" fill="rgba(74, 124, 89, 0.1)"/>
              <text x="50" y="25" text-anchor="middle" fill="#4A7C59" font-size="12" font-weight="600">UN SDG</text>
            </svg>
          </div>
          <div class="badge">
            <svg viewBox="0 0 100 40" class="badge-logo">
              <rect width="100" height="40" rx="4" fill="rgba(74, 124, 89, 0.1)"/>
              <text x="50" y="25" text-anchor="middle" fill="#4A7C59" font-size="12" font-weight="600">Charity Nav</text>
            </svg>
          </div>
          <div class="badge">
            <svg viewBox="0 0 100 40" class="badge-logo">
              <rect width="100" height="40" rx="4" fill="rgba(74, 124, 89, 0.1)"/>
              <text x="50" y="25" text-anchor="middle" fill="#4A7C59" font-size="12" font-weight="600">GuideStar</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  position: relative;
  background: var(--bg-secondary);
  overflow: hidden;
}

.testimonials-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
}

.bg-shape--1 {
  top: 10%;
  left: -5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--color-primary-100) 0%, transparent 70%);
}

.bg-shape--2 {
  bottom: 10%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--color-primary-50) 0%, transparent 70%);
}

/* Trust Badges */
.trust-badges {
  margin-top: var(--space-20);
  text-align: center;
}

.trust-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  color: var(--text-tertiary);
  margin-bottom: var(--space-6);
}

.badges-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-6);
}

.badge {
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.badge:hover {
  opacity: 1;
}

.badge-logo {
  width: 120px;
  height: 48px;
}

@media (max-width: 768px) {
  .badges-grid {
    gap: var(--space-4);
  }

  .badge-logo {
    width: 100px;
    height: 40px;
  }
}
</style>
