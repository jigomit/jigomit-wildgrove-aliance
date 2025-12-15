<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCounter from '../common/AnimatedCounter.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const statsRef = ref([])

const impactStats = [
  {
    icon: 'paw',
    value: 15847,
    suffix: '+',
    label: 'Animals Rescued & Protected',
    description: 'Endangered species given a second chance at life'
  },
  {
    icon: 'tree',
    value: 2.5,
    suffix: 'M',
    label: 'Acres of Habitat Preserved',
    description: 'Critical ecosystems protected from destruction'
  },
  {
    icon: 'globe',
    value: 52,
    suffix: '',
    label: 'Countries Reached',
    description: 'Global impact across continents'
  },
  {
    icon: 'users',
    value: 85000,
    suffix: '+',
    label: 'Active Volunteers',
    description: 'Dedicated individuals making a difference'
  }
]

onMounted(() => {
  // Header animation
  const headerTl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
  headerTl
    .fromTo('.impact-header .section-subtitle', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 })
    .fromTo('.impact-header .section-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    .fromTo('.impact-header .section-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')

  // Stats cards animation
  gsap.fromTo(statsRef.value,
    { opacity: 0, y: 40, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.stats-grid', start: 'top 75%' } }
  )

  // Icons animation
  gsap.fromTo('.stat-icon',
    { scale: 0, rotate: -45 },
    { scale: 1, rotate: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.2, scrollTrigger: { trigger: '.stats-grid', start: 'top 75%' } }
  )

  // Background glow animation
  gsap.fromTo('.bg-glow', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, stagger: 0.3, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
})
</script>

<template>
  <section ref="sectionRef" class="impact-section">
    <!-- Background Elements -->
    <div class="impact-bg">
      <div class="bg-pattern"></div>
      <div class="bg-glow bg-glow--1"></div>
      <div class="bg-glow bg-glow--2"></div>
    </div>

    <div class="container">
      <div class="impact-header">
        <span class="section-subtitle">Our Impact</span>
        <h2 class="section-title">Making a Real Difference</h2>
        <p class="section-description">
          Every number represents a life saved, a habitat protected, and hope for the future.
          Together, we are creating lasting change for wildlife and ecosystems worldwide.
        </p>
      </div>

      <div class="stats-grid">
        <div
          v-for="(stat, index) in impactStats"
          :key="index"
          :ref="el => statsRef[index] = el"
          class="stat-card"
        >
          <div class="stat-icon">
            <svg v-if="stat.icon === 'paw'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="12" cy="19" rx="4" ry="3"/>
              <ellipse cx="6" cy="12" rx="2.5" ry="3"/>
              <ellipse cx="18" cy="12" rx="2.5" ry="3"/>
              <ellipse cx="8" cy="6" rx="2" ry="2.5"/>
              <ellipse cx="16" cy="6" rx="2" ry="2.5"/>
            </svg>
            <svg v-else-if="stat.icon === 'tree'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22v-7l-2-2"/>
              <path d="M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/>
              <path d="m14 14-2 2"/>
            </svg>
            <svg v-else-if="stat.icon === 'globe'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>

          <div class="stat-value">
            <AnimatedCounter
              :value="stat.value"
              :suffix="stat.suffix"
              :duration="2.5"
              :decimals="stat.value < 100 ? 1 : 0"
            />
          </div>

          <h3 class="stat-label">{{ stat.label }}</h3>
          <p class="stat-description">{{ stat.description }}</p>

          <div class="stat-decoration"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.impact-section {
  position: relative;
  padding: var(--space-24) 0;
  background: var(--bg-dark);
  overflow: hidden;
}

/* Background */
.impact-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.bg-glow--1 {
  top: -20%;
  left: -10%;
  width: 50%;
  height: 50%;
  background: rgba(74, 124, 89, 0.3);
}

.bg-glow--2 {
  bottom: -20%;
  right: -10%;
  width: 40%;
  height: 40%;
  background: rgba(201, 162, 39, 0.2);
}

/* Header */
.impact-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--space-16);
}

.impact-header .section-subtitle {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  color: var(--color-accent-gold);
  margin-bottom: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: rgba(201, 162, 39, 0.2);
  border-radius: var(--radius-full);
}

.impact-header .section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, var(--text-5xl));
  font-weight: var(--font-semibold);
  color: var(--text-light);
  margin-bottom: var(--space-6);
}

.impact-header .section-description {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.7);
  line-height: var(--leading-relaxed);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  position: relative;
  text-align: center;
  padding: var(--space-10);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-base);
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.stat-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-6);
  background: rgba(74, 124, 89, 0.2);
  border-radius: var(--radius-xl);
  color: var(--color-primary-300);
  transition: all var(--transition-base);
}

.stat-card:hover .stat-icon {
  background: var(--gradient-nature);
  color: var(--text-light);
  transform: scale(1.1) rotate(5deg);
}

.stat-value {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  color: var(--text-light);
  line-height: 1;
  margin-bottom: var(--space-3);
}

.stat-label {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--color-accent-gold);
  margin-bottom: var(--space-2);
}

.stat-description {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
  line-height: var(--leading-relaxed);
}

.stat-decoration {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(74, 124, 89, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  transition: all var(--transition-base);
}

.stat-card:hover .stat-decoration {
  transform: scale(1.5);
  background: radial-gradient(circle, rgba(74, 124, 89, 0.2) 0%, transparent 70%);
}

@media (max-width: 768px) {
  .impact-section {
    padding: var(--space-16) 0;
  }

  .stat-card {
    padding: var(--space-8);
  }

  .stat-value {
    font-size: var(--text-4xl);
  }
}
</style>
