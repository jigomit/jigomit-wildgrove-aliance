<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const loaderRef = ref(null)
const logoRef = ref(null)
const progressRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()

  tl.fromTo(logoRef.value,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
  )
  .fromTo(progressRef.value,
    { width: '0%' },
    { width: '100%', duration: 1.2, ease: 'power2.inOut' },
    '-=0.3'
  )
})
</script>

<template>
  <div ref="loaderRef" class="page-loader">
    <div class="loader-content">
      <div ref="logoRef" class="loader-logo">
        <svg viewBox="0 0 100 100" class="logo-svg">
          <defs>
            <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#2D5A27" />
              <stop offset="100%" style="stop-color:#4A7C59" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#loaderGrad)" class="logo-circle"/>
          <path d="M50 20 C30 35 25 55 35 70 C40 60 45 50 50 45 C55 50 60 60 65 70 C75 55 70 35 50 20"
                fill="#E8F5E9" class="logo-leaf"/>
          <path d="M50 30 L50 65" stroke="#2D5A27" stroke-width="2" fill="none" class="logo-stem"/>
        </svg>
      </div>
      <h2 class="loader-title">WildGrove Alliance</h2>
      <div class="progress-bar">
        <div ref="progressRef" class="progress-fill"></div>
      </div>
      <p class="loader-text">Protecting Nature's Treasures</p>
    </div>

    <!-- Floating particles -->
    <div class="particles">
      <span v-for="i in 20" :key="i" class="particle" :style="{
        '--delay': `${Math.random() * 2}s`,
        '--duration': `${3 + Math.random() * 4}s`,
        '--x': `${Math.random() * 100}%`,
        '--size': `${5 + Math.random() * 10}px`
      }"></span>
    </div>
  </div>
</template>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0D2818 0%, #1B4332 50%, #2D5A27 100%);
  z-index: 9999;
  overflow: hidden;
}

.loader-content {
  text-align: center;
  z-index: 2;
}

.loader-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-6);
}

.logo-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
}

.logo-circle {
  animation: pulse 2s ease-in-out infinite;
}

.logo-leaf {
  animation: float 3s ease-in-out infinite;
  transform-origin: 50% 70%;
}

.loader-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  color: var(--text-light);
  margin-bottom: var(--space-6);
  letter-spacing: var(--tracking-wide);
}

.progress-bar {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  margin: 0 auto var(--space-4);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent-gold), var(--color-primary-300));
  border-radius: var(--radius-full);
}

.loader-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}

/* Floating particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  bottom: -20px;
  left: var(--x);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, rgba(168, 218, 181, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  animation: rise var(--duration) ease-in-out var(--delay) infinite;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(0.5);
    opacity: 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(3deg);
  }
}

@keyframes pulse {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.1);
  }
}
</style>
