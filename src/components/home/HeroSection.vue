<script setup>
import { ref } from 'vue'
import BaseButton from '../common/BaseButton.vue'

const heroRef = ref(null)
</script>

<template>
  <section ref="heroRef" class="hero">
    <!-- Background Image - Wildlife Conservation -->
    <div class="hero-background">
      <picture>
        <source
          type="image/webp"
          srcset="/images/hero-elephant-480.webp 480w,
                  /images/hero-elephant-800.webp 800w,
                  /images/hero-elephant-1280.webp 1280w"
          sizes="100vw"
        >
        <img
          src="/images/hero-elephant-800.jpg"
          srcset="/images/hero-elephant-480.jpg 480w,
                  /images/hero-elephant-800.jpg 800w,
                  /images/hero-elephant-1280.jpg 1280w"
          sizes="100vw"
          alt="African elephant in wildlife sanctuary - WildGrove Alliance conservation"
          class="hero-image"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          width="1280"
          height="847"
        >
      </picture>
      <div class="hero-overlay"></div>
    </div>

    <!-- Decorative elements removed to prevent CLS -->

    <div class="container hero-container">
      <div class="hero-content">
        <span class="hero-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7l8 5 8-5-8-5zM4 12l8 5 8-5M4 17l8 5 8-5"/>
          </svg>
          Wildlife Conservation NGO
        </span>

        <h1 class="hero-title">
          Protecting Wildlife,<br>
          <span class="title-highlight">Preserving Our Future</span>
        </h1>

        <p class="hero-description">
          Join WildGrove Alliance in our mission to protect endangered species,
          restore natural habitats, and create a sustainable future for all living beings.
        </p>

        <div class="hero-actions">
          <BaseButton to="/get-involved" size="large" variant="primary">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </template>
            Donate Now
          </BaseButton>

          <BaseButton to="/programs" size="large" variant="light">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
            </template>
            Watch Our Story
          </BaseButton>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">15K+</span>
            <span class="stat-label">Animals Saved</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">2M+</span>
            <span class="stat-label">Acres Protected</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">50+</span>
            <span class="stat-label">Countries</span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: 0;
  perspective: 1000px;
  transform-style: preserve-3d;
  overflow: hidden;
  /* Reserve space to prevent CLS */
  contain: layout style paint;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  /* Prevent CLS with placeholder background */
  background: var(--color-primary-900, #1B4332);
  aspect-ratio: 16 / 9;
  /* Use will-change for initial load only, then remove for better perf */
  will-change: auto;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(13, 40, 24, 0.85) 0%,
    rgba(27, 67, 50, 0.75) 40%,
    rgba(45, 90, 39, 0.65) 100%
  );
}

/* Floating 3D Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
}

.floating-element--1 {
  top: 10%;
  right: 15%;
  width: 150px;
  height: 150px;
  animation: float 8s ease-in-out infinite;
}

.floating-element--2 {
  bottom: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
  animation: float 10s ease-in-out infinite 1s;
}

.floating-element--3 {
  top: 30%;
  left: 5%;
  width: 100px;
  height: 100px;
  animation: float 6s ease-in-out infinite 2s;
}

.floating-svg {
  width: 100%;
  height: 100%;
  filter: blur(1px);
}

/* Particles */
.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: var(--size);
  height: var(--size);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: twinkle var(--duration) ease-in-out var(--delay) infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
  }
}

.hero-container {
  position: relative;
  z-index: 2;
  padding-top: var(--space-20);
  padding-bottom: var(--space-20);
}

.hero-content {
  max-width: 800px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
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

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: var(--font-bold);
  line-height: 1.1;
  color: var(--text-light);
  margin-bottom: var(--space-6);
}

.title-highlight {
  background: linear-gradient(135deg, var(--color-accent-gold) 0%, var(--color-primary-300) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--leading-relaxed);
  max-width: 600px;
  margin-bottom: var(--space-10);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-8);
  background: rgba(13, 40, 24, 0.8);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.15);
  /* Prevent CLS */
  min-height: 100px;
  contain: layout style;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text-light);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    min-height: 100svh;
  }

  .hero-background {
    height: 100%;
  }

  .hero-image {
    object-position: 70% center;
  }

  .hero-overlay {
    background: linear-gradient(
      180deg,
      rgba(13, 40, 24, 0.7) 0%,
      rgba(27, 67, 50, 0.5) 50%,
      rgba(45, 90, 39, 0.6) 100%
    );
  }

  .hero-container {
    padding-top: var(--space-16);
    padding-bottom: var(--space-24);
  }

  .hero-content {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .hero-description {
    font-size: var(--text-lg);
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-stats {
    flex-wrap: wrap;
    justify-content: center;
    padding: var(--space-4);
    gap: var(--space-4);
    background: rgba(13, 40, 24, 0.85);
  }

  .stat-divider {
    display: none;
  }

  .stat {
    min-width: 80px;
  }

  .stat-value {
    font-size: var(--text-2xl);
  }

  .floating-elements {
    display: none;
  }

  .hero-particles {
    opacity: 0.5;
  }
}

@media (max-width: 480px) {
  .hero-image {
    object-position: 65% center;
  }

  .hero-overlay {
    background: linear-gradient(
      180deg,
      rgba(13, 40, 24, 0.65) 0%,
      rgba(27, 67, 50, 0.45) 40%,
      rgba(45, 90, 39, 0.55) 100%
    );
  }

  .hero-title {
    font-size: clamp(2rem, 8vw, 2.5rem);
  }

  .hero-description {
    font-size: var(--text-base);
  }

  .hero-badge {
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-3);
  }

  .stat-value {
    font-size: var(--text-xl);
  }

  .stat-label {
    font-size: var(--text-xs);
  }
}
</style>
