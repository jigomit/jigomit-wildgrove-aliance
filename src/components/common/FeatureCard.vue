<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  icon: {
    type: String,
    default: 'leaf'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  delay: {
    type: Number,
    default: 0
  }
})

const cardRef = ref(null)

onMounted(() => {
  gsap.fromTo(cardRef.value,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  )
})
</script>

<template>
  <div ref="cardRef" class="feature-card">
    <div class="card-icon">
      <!-- Wildlife Icons -->
      <svg v-if="icon === 'elephant'" viewBox="0 0 64 64" class="icon-svg">
        <path fill="currentColor" d="M56 24c0-8.8-7.2-16-16-16H24C15.2 8 8 15.2 8 24v8c0 4.4 3.6 8 8 8h4v12c0 2.2 1.8 4 4 4s4-1.8 4-4V40h8v12c0 2.2 1.8 4 4 4s4-1.8 4-4V40h4c4.4 0 8-3.6 8-8v-8zm-8 8H16v-8c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v8z"/>
        <circle cx="22" cy="22" r="3"/>
        <circle cx="42" cy="22" r="3"/>
      </svg>
      <svg v-else-if="icon === 'tiger'" viewBox="0 0 64 64" class="icon-svg">
        <path fill="currentColor" d="M32 4C18.7 4 8 14.7 8 28c0 10.5 6.8 19.4 16.3 22.6.2 3.8 1.4 7.4 3.7 9.4h8c2.3-2 3.5-5.6 3.7-9.4C49.2 47.4 56 38.5 56 28 56 14.7 45.3 4 32 4zm-8 28c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm16 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
        <path fill="currentColor" d="M32 36l-4 4h8z"/>
      </svg>
      <svg v-else-if="icon === 'bird'" viewBox="0 0 64 64" class="icon-svg">
        <path fill="currentColor" d="M56 16c-4.4 0-8 3.6-8 8v4l-8 4-8-4V16c0-2.2-1.8-4-4-4H16c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h4l8 12h8l8-12h4c4.4 0 8-3.6 8-8V24c0-4.4-3.6-8-8-8zM20 32c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
      </svg>
      <svg v-else-if="icon === 'tree'" viewBox="0 0 64 64" class="icon-svg">
        <path fill="currentColor" d="M32 4L12 28h8l-8 12h8l-8 12h40l-8-12h8l-8-12h8L32 4zm-4 56h8v-8h-8v8z"/>
      </svg>
      <svg v-else-if="icon === 'ocean'" viewBox="0 0 64 64" class="icon-svg">
        <path fill="currentColor" d="M8 36c4 0 6-4 10-4s6 4 10 4 6-4 10-4 6 4 10 4 6-4 8-4v8c-2 0-4 4-8 4s-6-4-10-4-6 4-10 4-6-4-10-4-6 4-10 4v-8zm0 12c4 0 6-4 10-4s6 4 10 4 6-4 10-4 6 4 10 4 6-4 8-4v8c-2 0-4 4-8 4s-6-4-10-4-6 4-10 4-6-4-10-4-6 4-10 4v-8z"/>
        <circle cx="32" cy="20" r="12"/>
      </svg>
      <svg v-else viewBox="0 0 64 64" class="icon-svg">
        <path fill="currentColor" d="M32 4C20 4 8 20 8 36c0 12 8 24 24 24s24-12 24-24C56 20 44 4 32 4zm0 48c-12 0-20-8-20-16 0-12 8-24 20-24s20 12 20 24c0 8-8 16-20 16z"/>
        <path fill="currentColor" d="M32 16c-8 0-12 8-12 16h24c0-8-4-16-12-16z"/>
      </svg>
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    <RouterLink v-if="link" :to="link" class="card-link" :href="link" :aria-label="`Learn more about ${title}`">
      Explore {{ title }}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </RouterLink>
  </div>
</template>

<style scoped>
.feature-card {
  position: relative;
  background: var(--bg-primary);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  overflow: hidden;
}

.feature-card::before {
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

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-50);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-6);
  color: var(--color-primary-600);
  transition: all var(--transition-base);
}

.feature-card:hover .card-icon {
  background: var(--gradient-nature);
  color: var(--text-light);
  transform: scale(1.1);
}

.icon-svg {
  width: 32px;
  height: 32px;
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

.card-description {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
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

.card-link svg {
  transition: transform var(--transition-fast);
}

.card-link:hover svg {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .feature-card {
    padding: var(--space-6);
  }

  .card-icon {
    width: 56px;
    height: 56px;
  }

  .icon-svg {
    width: 28px;
    height: 28px;
  }
}
</style>
