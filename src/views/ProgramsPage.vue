<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/common/SectionHeader.vue'
import BaseButton from '../components/common/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const programsRef = ref([])
const successRef = ref([])
const heroRef = ref(null)
const researchRef = ref(null)
const ctaRef = ref(null)

const programs = [
  {
    id: 'big-cats',
    title: 'Big Cat Conservation',
    category: 'Wildlife Protection',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&q=90',
    description: 'Our flagship program protecting lions, tigers, leopards, and other big cats through anti-poaching patrols, habitat preservation, and community engagement.',
    features: [
      '24/7 Anti-poaching patrols',
      'GPS tracking & monitoring',
      'Community ranger programs',
      'Veterinary care units'
    ],
    stats: { animals: '500+', area: '50,000 acres', rangers: '120+' }
  },
  {
    id: 'marine',
    title: 'Marine Life Sanctuary',
    category: 'Ocean Conservation',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=90',
    description: 'Protecting coral reefs, sea turtles, and marine ecosystems from pollution, overfishing, and climate change through innovative conservation strategies.',
    features: [
      'Coral reef restoration',
      'Sea turtle nesting protection',
      'Sustainable fishing programs',
      'Ocean cleanup initiatives'
    ],
    stats: { reef: '200 miles', turtles: '10K+', cleanup: '500 tons' }
  },
  {
    id: 'rainforest',
    title: 'Rainforest Restoration',
    category: 'Habitat Recovery',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=90',
    description: 'Replanting native trees, restoring biodiversity, and working with indigenous communities to protect the world\'s most important carbon sinks.',
    features: [
      'Native tree planting',
      'Indigenous partnership',
      'Wildlife corridors',
      'Carbon offset programs'
    ],
    stats: { trees: '1M+', species: '500+', communities: '25' }
  },
  {
    id: 'elephants',
    title: 'Elephant Corridors',
    category: 'Migration Protection',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=90',
    description: 'Creating and protecting safe migration routes for elephant herds, preventing human-wildlife conflict, and ensuring genetic diversity.',
    features: [
      'Corridor mapping & protection',
      'Conflict resolution',
      'Community compensation',
      'Early warning systems'
    ],
    stats: { elephants: '2,000+', corridors: '15', villages: '50+' }
  },
  {
    id: 'birds',
    title: 'Avian Conservation',
    category: 'Bird Protection',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=90',
    description: 'Protecting endangered bird species and their habitats through nest monitoring, habitat restoration, and combating illegal wildlife trade.',
    features: [
      'Nest monitoring programs',
      'Wetland protection',
      'Anti-trafficking operations',
      'Captive breeding'
    ],
    stats: { species: '150+', nests: '5,000+', rescued: '800+' }
  },
  {
    id: 'primates',
    title: 'Great Ape Initiative',
    category: 'Primate Conservation',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=90',
    description: 'Dedicated to saving gorillas, chimpanzees, and orangutans from extinction through habitat protection and rehabilitation programs.',
    features: [
      'Sanctuary operations',
      'Anti-poaching units',
      'Habitat reforestation',
      'Research programs'
    ],
    stats: { primates: '300+', forest: '100K acres', sanctuaries: '5' }
  }
]

const successStories = [
  {
    title: 'Raja the Tiger',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=90',
    story: 'Rescued from illegal wildlife trade and rehabilitated over 18 months. Raja now lives freely in a protected reserve and has fathered three cubs.',
    outcome: 'Full recovery & wild release'
  },
  {
    title: 'Coral Bay Restoration',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&q=90',
    story: 'Our team restored 5 acres of damaged coral reef using innovative fragment transplantation, now home to over 200 marine species.',
    outcome: '95% coral survival rate'
  },
  {
    title: 'Amazon Reforestation',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=90',
    story: 'Working with local communities, we planted 100,000 native trees, creating vital wildlife corridors connecting fragmented habitats.',
    outcome: 'Wildlife populations doubled'
  }
]

onMounted(async () => {
  await nextTick()

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 100)

  // Hero section animations - immediate
  gsap.fromTo('.programs-hero .hero-badge',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
  )
  gsap.fromTo('.programs-hero .hero-title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, delay: 0.4 }
  )
  gsap.fromTo('.programs-hero .hero-description',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.6 }
  )

  // Programs list animations
  programsRef.value.forEach((program, index) => {
    const isReversed = index % 2 === 1
    const imageEl = program.querySelector('.program-image')
    const contentEl = program.querySelector('.program-content')

    gsap.fromTo(imageEl,
      { opacity: 0, x: isReversed ? 50 : -50 },
      { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: program, start: 'top 80%', once: true } }
    )
    gsap.fromTo(contentEl,
      { opacity: 0, x: isReversed ? -50 : 50 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.2, scrollTrigger: { trigger: program, start: 'top 80%', once: true } }
    )
  })

  // Success section
  gsap.fromTo('.success-section .section-header',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.success-section', start: 'top 80%', once: true } }
  )

  successRef.value.forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.15, scrollTrigger: { trigger: '.success-grid', start: 'top 85%', once: true } }
    )
  })

  // Research section
  gsap.fromTo('.research-content',
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: '.research-section', start: 'top 80%', once: true } }
  )
  gsap.fromTo('.visual-card',
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.research-visual', start: 'top 85%', once: true } }
  )

  // CTA section
  gsap.fromTo('.cta-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.programs-cta', start: 'top 80%', once: true } }
  )
  gsap.fromTo('.cta-description',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: '.programs-cta', start: 'top 80%', once: true } }
  )
  gsap.fromTo('.cta-actions',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.4, scrollTrigger: { trigger: '.programs-cta', start: 'top 80%', once: true } }
  )
})
</script>

<template>
  <div class="programs-page">
    <!-- Hero Section -->
    <section class="programs-hero">
      <div class="hero-background">
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1920&q=90"
          alt="Wildlife protection programs"
          loading="eager"
        >
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content">
        <span class="hero-badge">Conservation Programs</span>
        <h1 class="hero-title">Our Wildlife<br>Protection Initiatives</h1>
        <p class="hero-description">
          Comprehensive programs designed to protect endangered species,
          restore habitats, and create lasting change for wildlife worldwide.
        </p>
      </div>
    </section>

    <!-- Programs Grid -->
    <section class="programs-list section">
      <div class="container">
        <article
          v-for="(program, index) in programs"
          :key="program.id"
          :id="program.id"
          :ref="el => programsRef[index] = el"
          class="program-detail"
          :class="{ 'program-detail--reverse': index % 2 === 1 }"
        >
          <div class="program-image">
            <img :src="program.image" :alt="program.title" loading="lazy">
            <span class="program-category">{{ program.category }}</span>
          </div>

          <div class="program-content">
            <h2 class="program-title">{{ program.title }}</h2>
            <p class="program-description">{{ program.description }}</p>

            <ul class="program-features">
              <li v-for="feature in program.features" :key="feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ feature }}
              </li>
            </ul>

            <div class="program-stats">
              <div v-for="(value, key) in program.stats" :key="key" class="stat">
                <span class="stat-value">{{ value }}</span>
                <span class="stat-label">{{ key }}</span>
              </div>
            </div>

            <BaseButton to="/get-involved#donate" variant="primary">
              Support This Program
              <template #icon-right>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </template>
            </BaseButton>
          </div>
        </article>
      </div>
    </section>

    <!-- Success Stories -->
    <section id="success" class="success-section section">
      <div class="container">
        <SectionHeader
          subtitle="Success Stories"
          title="Making a Real Difference"
          description="Real stories of animals saved, habitats restored, and communities transformed through our conservation efforts."
        />

        <div class="success-grid">
          <article
            v-for="(story, index) in successStories"
            :key="story.title"
            :ref="el => successRef[index] = el"
            class="success-card"
          >
            <div class="success-image">
              <img :src="story.image" :alt="story.title" loading="lazy">
            </div>
            <div class="success-content">
              <h3 class="success-title">{{ story.title }}</h3>
              <p class="success-story">{{ story.story }}</p>
              <div class="success-outcome">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {{ story.outcome }}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Research Section -->
    <section class="research-section section">
      <div class="container">
        <div class="research-grid">
          <div class="research-content">
            <span class="section-subtitle">Research & Innovation</span>
            <h2 class="section-title">Science-Driven Conservation</h2>
            <p class="research-text">
              Our conservation strategies are backed by rigorous scientific research.
              We partner with leading universities and research institutions to develop
              innovative solutions for wildlife protection.
            </p>

            <div class="research-highlights">
              <div class="highlight">
                <span class="highlight-number">50+</span>
                <span class="highlight-label">Research Papers Published</span>
              </div>
              <div class="highlight">
                <span class="highlight-number">15</span>
                <span class="highlight-label">University Partners</span>
              </div>
              <div class="highlight">
                <span class="highlight-number">8</span>
                <span class="highlight-label">Active Field Studies</span>
              </div>
            </div>

            <BaseButton to="/about#research" variant="outline">
              Explore Our Research
            </BaseButton>
          </div>

          <div class="research-visual">
            <div class="visual-card">
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
              </div>
              <h4>Annual Reports</h4>
              <p>Transparent reporting on our conservation impact and financials.</p>
            </div>

            <div class="visual-card">
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
              </div>
              <h4>GPS Tracking</h4>
              <p>Real-time monitoring of wildlife movements and behaviors.</p>
            </div>

            <div class="visual-card">
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h4>AI Monitoring</h4>
              <p>Machine learning for species identification and threat detection.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="programs-cta">
      <div class="cta-background">
        <img
          src="https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=1920&q=90"
          alt="Rhino in wildlife reserve"
          loading="lazy"
        >
        <div class="cta-overlay"></div>
      </div>

      <div class="container cta-content">
        <h2 class="cta-title">Want to Support Our Programs?</h2>
        <p class="cta-description">
          Your contribution directly funds our conservation efforts.
          Join thousands of supporters making a real difference for wildlife.
        </p>
        <div class="cta-actions">
          <BaseButton to="/get-involved#donate" size="large" variant="primary">
            Donate Now
          </BaseButton>
          <BaseButton to="/get-involved#volunteer" size="large" variant="light">
            Volunteer With Us
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.programs-page {
  overflow-x: hidden;
}

/* Hero */
.programs-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(13, 40, 24, 0.9) 0%,
    rgba(27, 67, 50, 0.8) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
}

.hero-badge {
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

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-bold);
  color: var(--text-light);
  margin-bottom: var(--space-6);
}

.hero-description {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--leading-relaxed);
}

/* Programs List */
.programs-list {
  background: var(--bg-primary);
}

.program-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  padding: var(--space-16) 0;
  border-bottom: 1px solid var(--color-neutral-200);
}

.program-detail:last-child {
  border-bottom: none;
}

.program-detail--reverse {
  direction: rtl;
}

.program-detail--reverse > * {
  direction: ltr;
}

@media (max-width: 1024px) {
  .program-detail,
  .program-detail--reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}

.program-image {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.program-image img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.program-detail:hover .program-image img {
  transform: scale(1.05);
}

.program-category {
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

.program-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, var(--text-4xl));
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.program-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.program-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

@media (max-width: 640px) {
  .program-features {
    grid-template-columns: 1fr;
  }
}

.program-features li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.program-features svg {
  color: var(--color-primary-500);
  flex-shrink: 0;
}

.program-stats {
  display: flex;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-neutral-200);
  border-bottom: 1px solid var(--color-neutral-200);
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: capitalize;
}

/* Success Section */
.success-section {
  background: var(--bg-secondary);
}

.success-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

@media (max-width: 1024px) {
  .success-grid {
    grid-template-columns: 1fr;
  }
}

.success-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
}

.success-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.success-image {
  height: 200px;
  overflow: hidden;
}

.success-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.success-card:hover .success-image img {
  transform: scale(1.1);
}

.success-content {
  padding: var(--space-6);
}

.success-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.success-story {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.success-outcome {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-primary-600);
}

.success-outcome svg {
  color: var(--color-primary-500);
}

/* Research Section */
.research-section {
  background: var(--bg-primary);
}

.research-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

@media (max-width: 1024px) {
  .research-grid {
    grid-template-columns: 1fr;
  }
}

.research-content .section-subtitle {
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

.research-content .section-title {
  margin-bottom: var(--space-6);
}

.research-text {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}

.research-highlights {
  display: flex;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.highlight {
  text-align: center;
}

.highlight-number {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
}

.highlight-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.research-visual {
  display: grid;
  gap: var(--space-6);
}

.visual-card {
  padding: var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.visual-card:hover {
  background: var(--color-primary-50);
}

.visual-card .card-icon {
  color: var(--color-primary-500);
  margin-bottom: var(--space-4);
}

.visual-card h4 {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.visual-card p {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* CTA Section */
.programs-cta {
  position: relative;
  padding: var(--space-24) 0;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cta-background img {
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
    rgba(27, 67, 50, 0.9) 100%
  );
}

.cta-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, var(--text-4xl));
  font-weight: var(--font-bold);
  color: var(--text-light);
  margin-bottom: var(--space-6);
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
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .programs-hero {
    min-height: 50vh;
    padding-top: calc(var(--header-height-mobile) + var(--space-8));
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-description {
    font-size: var(--text-lg);
  }

  .program-detail {
    padding: var(--space-10) 0;
    gap: var(--space-8);
  }

  .program-title {
    font-size: var(--text-2xl);
  }

  .program-description {
    font-size: var(--text-base);
  }

  .program-stats {
    flex-wrap: wrap;
    gap: var(--space-4);
    justify-content: center;
  }

  .stat {
    min-width: 80px;
  }

  .stat-value {
    font-size: var(--text-xl);
  }

  .research-highlights {
    flex-wrap: wrap;
    gap: var(--space-4);
    justify-content: center;
  }

  .highlight {
    min-width: 100px;
  }

  .highlight-number {
    font-size: var(--text-2xl);
  }

  .programs-cta {
    padding: var(--space-16) 0;
  }

  .cta-title {
    font-size: var(--text-2xl);
  }

  .cta-description {
    font-size: var(--text-lg);
  }
}

@media (max-width: 480px) {
  .programs-hero {
    min-height: 45vh;
  }

  .hero-badge {
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-3);
  }

  .hero-title {
    font-size: var(--text-2xl);
  }

  .hero-description {
    font-size: var(--text-base);
  }

  .section {
    padding: var(--space-12) 0;
  }

  .program-category {
    top: var(--space-2);
    left: var(--space-2);
    font-size: 0.65rem;
    padding: var(--space-1) var(--space-2);
  }

  .success-content {
    padding: var(--space-4);
  }

  .success-title {
    font-size: var(--text-lg);
  }

  .visual-card {
    padding: var(--space-4);
  }

  .visual-card .card-icon svg {
    width: 36px;
    height: 36px;
  }
}
</style>
