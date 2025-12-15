<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  subtitle: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'center',
    validator: (val) => ['left', 'center', 'right'].includes(val)
  },
  light: {
    type: Boolean,
    default: false
  }
})

const headerRef = ref(null)

onMounted(() => {
  gsap.fromTo(headerRef.value,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  )
})
</script>

<template>
  <div
    ref="headerRef"
    class="section-header"
    :class="[
      `section-header--${align}`,
      { 'section-header--light': light }
    ]"
  >
    <span v-if="subtitle" class="section-subtitle">{{ subtitle }}</span>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="description" class="section-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.section-header {
  max-width: 800px;
  margin-bottom: var(--space-16);
}

.section-header--center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.section-header--left {
  text-align: left;
}

.section-header--right {
  text-align: right;
  margin-left: auto;
}

.section-subtitle {
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

.section-header--light .section-subtitle {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-accent-gold);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, var(--text-5xl));
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

.section-header--light .section-title {
  color: var(--text-light);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
}

.section-header--light .section-description {
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: var(--space-10);
  }

  .section-description {
    font-size: var(--text-base);
  }
}
</style>
