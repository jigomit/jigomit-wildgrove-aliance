<script setup>
import { ref, onMounted } from 'vue'
import SectionHeader from '../common/SectionHeader.vue'
import TestimonialSlider from '../common/TestimonialSlider.vue'

const sectionRef = ref(null)

onMounted(() => {
  const runAnimations = async () => {
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo('.testimonials-section .section-header',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true } }
    )

    gsap.fromTo('.testimonial-slider',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true } }
    )
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(runAnimations)
  } else {
    setTimeout(runAnimations, 200)
  }
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
