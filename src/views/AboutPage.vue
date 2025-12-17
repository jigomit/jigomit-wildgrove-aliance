<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/common/SectionHeader.vue'
import BaseButton from '../components/common/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const timelineRef = ref([])
const teamRef = ref([])
const valuesRef = ref([])
const partnersRef = ref([])

const timeline = [
  { year: '2010', title: 'Foundation', description: 'WildGrove Alliance was founded by a group of passionate conservationists.' },
  { year: '2013', title: 'First Sanctuary', description: 'Established our first wildlife sanctuary in East Africa.' },
  { year: '2016', title: 'Global Expansion', description: 'Expanded operations to 25 countries across 5 continents.' },
  { year: '2019', title: 'Marine Initiative', description: 'Launched comprehensive ocean conservation programs.' },
  { year: '2022', title: 'Million Trees', description: 'Planted our one millionth tree in restoration projects.' },
  { year: '2024', title: 'AI Conservation', description: 'Pioneered AI-powered wildlife monitoring systems.' }
]

const team = [
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Executive Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'Wildlife biologist with 20+ years of conservation experience.'
  },
  {
    name: 'James Okonkwo',
    role: 'Head of Field Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Former park ranger leading anti-poaching efforts in Africa.'
  },
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Scientist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Environmental researcher specializing in ecosystem restoration.'
  },
  {
    name: 'Michael Thompson',
    role: 'Director of Partnerships',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Building global alliances for wildlife conservation.'
  }
]

const values = [
  {
    icon: 'heart',
    title: 'Compassion',
    description: 'Every creature deserves protection and care.'
  },
  {
    icon: 'science',
    title: 'Science-Driven',
    description: 'Our strategies are backed by rigorous research.'
  },
  {
    icon: 'community',
    title: 'Community First',
    description: 'Empowering local communities as conservation partners.'
  },
  {
    icon: 'transparency',
    title: 'Transparency',
    description: 'Open and accountable in all our operations.'
  }
]

const partners = [
  { name: 'World Wildlife Fund', icon: 'globe' },
  { name: 'Conservation International', icon: 'leaf' },
  { name: 'The Nature Conservancy', icon: 'tree' },
  { name: 'Wildlife Conservation Society', icon: 'shield' },
  { name: 'IUCN', icon: 'globe' },
  { name: 'Rainforest Alliance', icon: 'leaf' },
  { name: 'Ocean Conservancy', icon: 'mountain' },
  { name: 'African Wildlife Foundation', icon: 'sun' }
]

onMounted(async () => {
  await nextTick()

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 100)

  // Hero section animations - immediate
  gsap.fromTo('.about-hero .hero-badge',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
  )
  gsap.fromTo('.about-hero .hero-title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, delay: 0.4 }
  )
  gsap.fromTo('.about-hero .hero-description',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.6 }
  )

  // Story section - scroll triggered
  gsap.fromTo('.story-content',
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: '.story-section', start: 'top 80%', once: true } }
  )
  gsap.fromTo('.story-image',
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: '.story-section', start: 'top 80%', once: true } }
  )

  // Values section
  gsap.fromTo('.values-section .section-header',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.values-section', start: 'top 80%', once: true } }
  )
  gsap.fromTo('.value-card',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.values-grid', start: 'top 85%', once: true } }
  )

  // Timeline section
  gsap.fromTo('.timeline-section .section-header',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.timeline-section', start: 'top 80%', once: true } }
  )

  // Timeline items
  timelineRef.value.forEach((item, index) => {
    const isRight = index % 2 === 1
    gsap.fromTo(item,
      { opacity: 0, x: isRight ? 50 : -50 },
      { opacity: 1, x: 0, duration: 0.6, scrollTrigger: { trigger: item, start: 'top 85%', once: true } }
    )
  })

  // Team section
  gsap.fromTo('.team-section .section-header',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.team-section', start: 'top 80%', once: true } }
  )

  teamRef.value.forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1, scrollTrigger: { trigger: '.team-grid', start: 'top 85%', once: true } }
    )
  })

  gsap.fromTo('.team-cta',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.team-cta', start: 'top 90%', once: true } }
  )

  // Partners section
  gsap.fromTo('.partners-section .section-header',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.partners-section', start: 'top 80%', once: true } }
  )
  gsap.fromTo('.partner-logo',
    { opacity: 0, y: 20 },
    { opacity: 0.6, y: 0, duration: 0.4, stagger: 0.05, scrollTrigger: { trigger: '.partners-grid', start: 'top 85%', once: true } }
  )
})
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section ref="heroRef" class="about-hero">
      <div class="hero-background">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
          alt="Majestic elephant in African wilderness"
          loading="eager"
        >
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content">
        <span class="hero-badge">About Us</span>
        <h1 class="hero-title">Guardians of Wildlife</h1>
        <p class="hero-description">
          For over a decade, WildGrove Alliance has been at the forefront of wildlife conservation,
          protecting endangered species and restoring ecosystems across the globe.
        </p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section section">
      <div class="container">
        <div class="story-grid">
          <div class="story-content">
            <span class="section-subtitle">Our Story</span>
            <h2 class="section-title">Born From a Love of Nature</h2>
            <p class="story-text">
              WildGrove Alliance began in 2010 when a group of wildlife biologists, conservationists,
              and nature enthusiasts came together with a shared vision: a world where wildlife thrives
              alongside humanity.
            </p>
            <p class="story-text">
              What started as a small initiative to protect local habitats has grown into a global
              movement spanning 52 countries, with thousands of dedicated volunteers and partners
              working tirelessly to protect our planet's most vulnerable species.
            </p>
            <p class="story-text">
              Today, we operate wildlife sanctuaries, lead anti-poaching patrols, restore degraded
              ecosystems, and educate communities about the importance of conservation.
            </p>
          </div>
          <div class="story-image">
            <img
              src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80"
              alt="Lion in natural habitat"
              loading="lazy"
            >
            <div class="image-decoration"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section section">
      <div class="container">
        <SectionHeader
          subtitle="Our Values"
          title="What Guides Us"
          description="These core principles shape every decision we make and every action we take."
        />

        <div class="values-grid">
          <div v-for="value in values" :key="value.title" class="value-card">
            <div class="value-icon">
              <svg v-if="value.icon === 'heart'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <svg v-else-if="value.icon === 'science'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 2v8L8 14c-2.21 1.5-3 3.5-3 5.5 0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4 0-2-0.79-4-3-5.5L14 10V2"/>
                <line x1="8.5" y1="2" x2="15.5" y2="2"/>
              </svg>
              <svg v-else-if="value.icon === 'community'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section section">
      <div class="container">
        <SectionHeader
          subtitle="Our Journey"
          title="Milestones in Conservation"
          description="Key moments that have shaped our organization and impact."
          :light="true"
        />

        <div class="timeline">
          <div class="timeline-line"></div>
          <div
            v-for="(item, index) in timeline"
            :key="item.year"
            :ref="el => timelineRef[index] = el"
            class="timeline-item"
            :class="{ 'timeline-item--right': index % 2 === 1 }"
          >
            <div class="timeline-content">
              <span class="timeline-year">{{ item.year }}</span>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-description">{{ item.description }}</p>
            </div>
            <div class="timeline-dot"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section section">
      <div class="container">
        <SectionHeader
          subtitle="Our Team"
          title="Meet the Conservationists"
          description="Dedicated experts leading the charge for wildlife protection."
        />

        <div class="team-grid">
          <article
            v-for="(member, index) in team"
            :key="member.name"
            :ref="el => teamRef[index] = el"
            class="team-card"
          >
            <div class="team-image">
              <img :src="member.image" :alt="member.name" loading="lazy">
              <div class="team-overlay">
                <div class="social-links">
                  <a href="#" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="team-info">
              <h3 class="team-name">{{ member.name }}</h3>
              <span class="team-role">{{ member.role }}</span>
              <p class="team-bio">{{ member.bio }}</p>
            </div>
          </article>
        </div>

        <div class="team-cta">
          <p>Want to join our team?</p>
          <BaseButton to="/get-involved#careers" variant="outline">
            View Open Positions
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="partners-section section">
      <div class="container">
        <SectionHeader
          subtitle="Our Partners"
          title="Working Together for Wildlife"
          description="We collaborate with leading organizations worldwide to maximize our conservation impact."
        />

        <div class="partners-grid">
          <div v-for="partner in partners" :key="partner.name" class="partner-logo">
            <div class="partner-card">
              <div class="partner-icon">
                <svg v-if="partner.icon === 'globe'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <svg v-else-if="partner.icon === 'leaf'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
                <svg v-else-if="partner.icon === 'heart'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <svg v-else-if="partner.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <svg v-else-if="partner.icon === 'tree'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22V8"/>
                  <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
                  <path d="M12 8a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6Z"/>
                  <path d="M12 2v6"/>
                </svg>
                <svg v-else-if="partner.icon === 'mountain'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
                </svg>
                <svg v-else-if="partner.icon === 'sun'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span class="partner-name">{{ partner.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  overflow-x: hidden;
}

/* Hero Section */
.about-hero {
  position: relative;
  min-height: 70vh;
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
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: var(--font-bold);
  color: var(--text-light);
  margin-bottom: var(--space-6);
}

.hero-description {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--leading-relaxed);
}

/* Story Section */
.story-section {
  background: var(--bg-primary);
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

@media (max-width: 1024px) {
  .story-grid {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}

.story-content .section-subtitle {
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

.story-content .section-title {
  margin-bottom: var(--space-8);
}

.story-text {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.story-image {
  position: relative;
}

.story-image img {
  width: 100%;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
}

.image-decoration {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 200px;
  height: 200px;
  background: var(--color-primary-100);
  border-radius: var(--radius-2xl);
  z-index: -1;
}

/* Values Section */
.values-section {
  background: var(--bg-secondary);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .values-grid {
    grid-template-columns: 1fr;
  }
}

.value-card {
  text-align: center;
  padding: var(--space-8);
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.value-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-6);
  background: var(--color-primary-50);
  border-radius: var(--radius-xl);
  color: var(--color-primary-600);
  transition: all var(--transition-base);
}

.value-card:hover .value-icon {
  background: var(--gradient-nature);
  color: var(--text-light);
}

.value-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.value-description {
  font-size: var(--text-base);
  color: var(--text-tertiary);
}

/* Timeline Section */
.timeline-section {
  background: var(--bg-dark);
  padding: var(--space-24) 0;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }
}

.timeline-item {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: calc(50% + 40px);
  margin-bottom: var(--space-12);
}

.timeline-item--right {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: calc(50% + 40px);
}

@media (max-width: 768px) {
  .timeline-item,
  .timeline-item--right {
    padding-left: 60px;
    padding-right: 0;
    justify-content: flex-start;
  }
}

.timeline-content {
  max-width: 350px;
  padding: var(--space-6);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-year {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--color-accent-gold);
  color: var(--color-primary-900);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-3);
}

.timeline-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-light);
  margin-bottom: var(--space-2);
}

.timeline-description {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: var(--space-6);
  width: 16px;
  height: 16px;
  background: var(--color-primary-400);
  border: 3px solid var(--bg-dark);
  border-radius: 50%;
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .timeline-dot {
    left: 20px;
  }
}

/* Team Section */
.team-section {
  background: var(--bg-primary);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

.team-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.team-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.team-card:hover .team-image img {
  transform: scale(1.1);
}

.team-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: var(--space-4);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.team-card:hover .team-overlay {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: var(--space-3);
}

.social-links a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  color: var(--text-light);
  transition: all var(--transition-fast);
}

.social-links a:hover {
  background: var(--color-primary-500);
}

.team-info {
  padding: var(--space-6);
  text-align: center;
}

.team-name {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.team-role {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary-500);
  margin-bottom: var(--space-3);
}

.team-bio {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.team-cta {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.team-cta p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

/* Partners Section */
.partners-section {
  background: var(--bg-secondary);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .partners-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.partner-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: all var(--transition-base);
}

.partner-logo:hover {
  opacity: 1;
  transform: translateY(-4px);
}

.partner-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-height: 140px;
  transition: all var(--transition-base);
}

.partner-logo:hover .partner-card {
  box-shadow: var(--shadow-md);
}

.partner-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-50);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
}

.partner-icon svg {
  width: 100%;
  height: 100%;
  color: var(--color-primary-600);
}

.partner-name {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  text-align: center;
  line-height: 1.3;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .about-hero {
    min-height: 60vh;
    padding-top: calc(var(--header-height-mobile) + var(--space-8));
  }

  .hero-title {
    font-size: var(--text-4xl);
  }

  .hero-description {
    font-size: var(--text-lg);
  }

  .story-text {
    font-size: var(--text-base);
  }

  .image-decoration {
    display: none;
  }

  .timeline-section {
    padding: var(--space-16) 0;
  }

  .timeline-content {
    padding: var(--space-4);
  }

  .timeline-title {
    font-size: var(--text-lg);
  }

  .team-info {
    padding: var(--space-4);
  }

  .team-name {
    font-size: var(--text-lg);
  }

  .value-card {
    padding: var(--space-6);
  }

  .value-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .about-hero {
    min-height: 50vh;
  }

  .hero-badge {
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-3);
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-description {
    font-size: var(--text-base);
  }

  .section {
    padding: var(--space-12) 0;
  }
}
</style>
