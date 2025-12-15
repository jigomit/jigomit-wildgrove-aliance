<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../common/SectionHeader.vue'
import BaseButton from '../common/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const programsRef = ref([])

const programs = [
  {
    id: 1,
    title: 'Big Cat Conservation',
    category: 'Wildlife Protection',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&q=75&auto=format',
    description: 'Protecting lions, tigers, and leopards through anti-poaching patrols and habitat preservation.',
    stats: { animals: '500+', area: '50K acres' }
  },
  {
    id: 2,
    title: 'Marine Life Sanctuary',
    category: 'Ocean Conservation',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=75&auto=format',
    description: 'Safeguarding coral reefs and marine ecosystems from pollution and overfishing.',
    stats: { animals: '10K+', area: '200 miles' }
  },
  {
    id: 3,
    title: 'Rainforest Restoration',
    category: 'Habitat Recovery',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=75&auto=format',
    description: 'Replanting native trees and restoring biodiversity in deforested regions.',
    stats: { animals: '1M+ trees', area: '100K acres' }
  },
  {
    id: 4,
    title: 'Elephant Corridors',
    category: 'Wildlife Protection',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&q=75&auto=format',
    description: 'Creating safe passages for elephant herds to migrate between habitats.',
    stats: { animals: '2K+', area: '75K acres' }
  }
]

onMounted(() => {
  programsRef.value.forEach((program, index) => {
    gsap.fromTo(program,
      { opacity: 0, y: 80, rotateY: 15 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
})
</script>

<template>
  <section ref="sectionRef" class="programs-section section">
    <div class="container">
      <SectionHeader
        subtitle="Our Programs"
        title="Wildlife Protection Initiatives"
        description="Explore our comprehensive programs designed to protect endangered species and preserve natural ecosystems worldwide."
      />

      <div class="programs-grid">
        <article
          v-for="(program, index) in programs"
          :key="program.id"
          :ref="el => programsRef[index] = el"
          class="program-card"
        >
          <div class="card-image">
            <img :src="program.image" :alt="`${program.title} - WildGrove Alliance wildlife conservation program`" loading="lazy" decoding="async" width="400" height="280">
            <div class="card-overlay"></div>
            <span class="card-category">{{ program.category }}</span>
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ program.title }}</h3>
            <p class="card-description">{{ program.description }}</p>

            <div class="card-stats">
              <div class="stat">
                <span class="stat-value">{{ program.stats.animals }}</span>
                <span class="stat-label">Protected</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ program.stats.area }}</span>
                <span class="stat-label">Coverage</span>
              </div>
            </div>

            <RouterLink :to="`/programs#${program.id}`" class="card-link" :aria-label="`Learn more about ${program.title}`">
              Learn about {{ program.title }}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </RouterLink>
          </div>
        </article>
      </div>

      <div class="section-cta">
        <BaseButton to="/programs" size="large" variant="outline">
          View All Programs
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </template>
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.programs-section {
  background: var(--bg-primary);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

@media (max-width: 1024px) {
  .programs-grid {
    grid-template-columns: 1fr;
  }
}

.program-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
}

.program-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

@media (max-width: 640px) {
  .program-card {
    grid-template-columns: 1fr;
  }
}

.card-image {
  position: relative;
  height: 100%;
  min-height: 280px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.program-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
}

.card-category {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-primary-700);
}

.card-content {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.card-description {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
  flex: 1;
}

.card-stats {
  display: flex;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.stat {
  text-align: center;
  flex: 1;
}

.stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-primary-600);
  transition: all var(--transition-fast);
}

.card-link:hover {
  gap: var(--space-3);
  color: var(--color-primary-700);
}

.section-cta {
  text-align: center;
}

@media (max-width: 640px) {
  .card-image {
    min-height: 200px;
  }

  .card-content {
    padding: var(--space-6);
  }

  .card-title {
    font-size: var(--text-xl);
  }
}
</style>
