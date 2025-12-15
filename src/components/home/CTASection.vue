<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BaseButton from '../common/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const contentRef = ref(null)

onMounted(() => {
  // Background image
  gsap.fromTo('.cta-image', { scale: 1.1 }, { scale: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
  gsap.to('.cta-image', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: sectionRef.value, start: 'top bottom', end: 'bottom top', scrub: 1 } })

  // Content animation
  const contentTl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' } })
  contentTl
    .fromTo('.cta-badge', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 })
    .fromTo('.cta-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .fromTo('.cta-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
    .fromTo('.cta-actions .btn', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(1.3)' }, '-=0.2')
    .fromTo('.quick-stats', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
    .fromTo('.quick-stat', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, '-=0.2')

  // Animate floating elements
  gsap.to('.cta-float', { y: -25, duration: 2.5, ease: 'power1.inOut', yoyo: true, repeat: -1, stagger: 0.5 })
})
</script>

<template>
  <section ref="sectionRef" class="cta-section">
    <!-- Background -->
    <div class="cta-background">
      <img
        src="https://images.unsplash.com/photo-1535338454770-8be927b5a00b?w=1920&q=90"
        alt="Majestic giraffe in African savanna"
        class="cta-image"
        loading="lazy"
      >
      <div class="cta-overlay"></div>
    </div>

    <!-- Floating Elements -->
    <div class="cta-floats">
      <div class="cta-float cta-float--1">
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2"/>
        </svg>
      </div>
      <div class="cta-float cta-float--2">
        <svg viewBox="0 0 60 60">
          <path d="M30 5 L55 50 L5 50 Z" fill="rgba(201, 162, 39, 0.15)" stroke="rgba(201, 162, 39, 0.3)" stroke-width="2"/>
        </svg>
      </div>
      <div class="cta-float cta-float--3">
        <svg viewBox="0 0 100 100">
          <path d="M50 10 C30 25 25 45 35 60 C40 50 45 40 50 35 C55 40 60 50 65 60 C75 45 70 25 50 10" fill="rgba(168, 218, 181, 0.2)"/>
        </svg>
      </div>
    </div>

    <div class="container">
      <div ref="contentRef" class="cta-content">
        <span class="cta-badge">Get Involved</span>
        <h2 class="cta-title">
          Join the<br>
          <span class="title-highlight">Conservation Movement</span>
        </h2>
        <p class="cta-description">
          Every action counts. Donate, volunteer, or partner with us to protect wildlife
          and preserve our planet for future generations.
        </p>

        <div class="cta-actions">
          <BaseButton to="/get-involved#donate" size="large" variant="primary">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </template>
            Donate Now
          </BaseButton>

          <BaseButton to="/get-involved#volunteer" size="large" variant="light">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </template>
            Volunteer With Us
          </BaseButton>
        </div>

        <!-- Quick Impact Stats -->
        <div class="quick-stats">
          <div class="quick-stat">
            <span class="quick-value">$25</span>
            <span class="quick-label">Feeds an animal for a month</span>
          </div>
          <div class="quick-stat">
            <span class="quick-value">$100</span>
            <span class="quick-label">Plants 50 native trees</span>
          </div>
          <div class="quick-stat">
            <span class="quick-value">$500</span>
            <span class="quick-label">Funds a rescue operation</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  position: relative;
  padding: var(--space-32) 0;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cta-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(13, 40, 24, 0.95) 0%,
    rgba(27, 67, 50, 0.9) 50%,
    rgba(45, 90, 39, 0.85) 100%
  );
}

/* Floating Elements */
.cta-floats {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cta-float {
  position: absolute;
}

.cta-float--1 {
  top: 15%;
  left: 10%;
  width: 100px;
  height: 100px;
}

.cta-float--2 {
  bottom: 20%;
  right: 15%;
  width: 80px;
  height: 80px;
}

.cta-float--3 {
  top: 40%;
  right: 8%;
  width: 120px;
  height: 120px;
}

.cta-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-5);
  background: rgba(201, 162, 39, 0.2);
  border: 1px solid rgba(201, 162, 39, 0.4);
  border-radius: var(--radius-full);
  color: var(--color-accent-gold);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin-bottom: var(--space-6);
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-bold);
  color: var(--text-light);
  line-height: 1.1;
  margin-bottom: var(--space-6);
}

.title-highlight {
  background: linear-gradient(135deg, var(--color-accent-gold) 0%, var(--color-primary-300) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-description {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-10);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

/* Quick Stats */
.quick-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-6) var(--space-8);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.quick-stat {
  text-align: center;
}

.quick-value {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-accent-gold);
  margin-bottom: var(--space-1);
}

.quick-label {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .cta-section {
    padding: var(--space-20) 0;
  }

  .cta-description {
    font-size: var(--text-lg);
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .quick-stats {
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
  }

  .cta-floats {
    display: none;
  }
}
</style>
