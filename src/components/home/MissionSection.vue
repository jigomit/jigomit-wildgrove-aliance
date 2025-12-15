<script setup>
import SectionHeader from '../common/SectionHeader.vue'

const missionPoints = [
  {
    icon: 'shield',
    title: 'Protect',
    description: 'Safeguarding endangered species and their natural habitats from threats like poaching, deforestation, and climate change.'
  },
  {
    icon: 'refresh',
    title: 'Restore',
    description: 'Rehabilitating degraded ecosystems and reintroducing species to their native habitats for a balanced ecosystem.'
  },
  {
    icon: 'education',
    title: 'Educate',
    description: 'Raising awareness about wildlife conservation through community programs, schools, and digital outreach.'
  }
]
// GSAP animations disabled to prevent CLS
</script>

<template>
  <section class="mission-section section">
    <div class="container">
      <SectionHeader
        subtitle="Our Mission"
        title="A World Where Wildlife Thrives"
        description="We believe every species has the right to exist. Our mission is to protect, restore, and educate for a sustainable future."
      />

      <div class="mission-grid">
        <div
          v-for="(point, index) in missionPoints"
          :key="index"
          class="mission-card"
        >
          <div class="card-icon">
            <svg v-if="point.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <svg v-else-if="point.icon === 'refresh'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>

          <h3 class="card-title">{{ point.title }}</h3>
          <p class="card-description">{{ point.description }}</p>

          <div class="card-number">0{{ index + 1 }}</div>
        </div>
      </div>

      <!-- Vision Statement -->
      <div class="vision-block">
        <div class="vision-content">
          <span class="vision-label">Our Vision</span>
          <h3 class="vision-title">
            "A future where humans and wildlife coexist in harmony,
            where every ecosystem thrives, and biodiversity flourishes."
          </h3>
        </div>
        <div class="vision-decoration">
          <svg viewBox="0 0 200 200" class="vision-svg">
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(74, 124, 89, 0.2)" stroke-width="2" stroke-dasharray="10 5"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(74, 124, 89, 0.15)" stroke-width="2"/>
            <path d="M100 40 C70 60 65 90 80 110 C85 95 92 80 100 70 C108 80 115 95 120 110 C135 90 130 60 100 40" fill="rgba(74, 124, 89, 0.3)"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission-section {
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-20);
}

.mission-card {
  position: relative;
  background: var(--bg-primary);
  padding: var(--space-10);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  overflow: hidden;
}

.mission-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-nature);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.mission-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-card-hover);
}

.mission-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-50);
  border-radius: var(--radius-xl);
  color: var(--color-primary-600);
  margin-bottom: var(--space-6);
  transition: all var(--transition-base);
}

.mission-card:hover .card-icon {
  background: var(--gradient-nature);
  color: var(--text-light);
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.card-description {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
}

.card-number {
  position: absolute;
  bottom: var(--space-6);
  right: var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-50);
  line-height: 1;
  transition: color var(--transition-base);
}

.mission-card:hover .card-number {
  color: var(--color-primary-100);
}

/* Vision Block */
.vision-block {
  position: relative;
  background: var(--bg-primary);
  padding: var(--space-16);
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-12);
  overflow: hidden;
}

.vision-content {
  flex: 1;
  max-width: 700px;
}

.vision-label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  color: var(--color-primary-500);
  margin-bottom: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary-50);
  border-radius: var(--radius-full);
}

.vision-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, var(--text-3xl));
  font-weight: var(--font-medium);
  font-style: italic;
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
}

.vision-decoration {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  animation: spin-slow 30s linear infinite;
}

.vision-svg {
  width: 100%;
  height: 100%;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .mission-card {
    padding: var(--space-8);
  }

  .card-number {
    font-size: var(--text-5xl);
  }

  .vision-block {
    flex-direction: column;
    padding: var(--space-10);
    text-align: center;
  }

  .vision-decoration {
    width: 150px;
    height: 150px;
  }
}
</style>
