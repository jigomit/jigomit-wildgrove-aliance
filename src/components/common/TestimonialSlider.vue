<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const testimonials = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    role: 'Wildlife Biologist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'WildGrove Alliance has been instrumental in protecting endangered species in our region. Their dedication and scientific approach to conservation is truly remarkable.',
    rating: 5
  },
  {
    id: 2,
    name: 'James Rodriguez',
    role: 'Environmental Activist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'Volunteering with WildGrove has been life-changing. The team is passionate, professional, and truly makes a difference in wildlife conservation.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Nature Photographer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'Through my lens, I have witnessed the incredible impact of WildGrove\'s conservation efforts. They are heroes for our planet\'s wildlife.',
    rating: 5
  },
  {
    id: 4,
    name: 'Michael Thompson',
    role: 'Corporate Donor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: 'Our company is proud to support WildGrove Alliance. Their transparency and measurable impact make them a trusted partner in conservation.',
    rating: 5
  }
]

const currentIndex = ref(0)
const sliderRef = ref(null)
const autoplayInterval = ref(null)

const goToSlide = (index) => {
  currentIndex.value = index
  animateSlide()
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
  animateSlide()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length
  animateSlide()
}

const animateSlide = () => {
  // GSAP animation disabled to prevent CLS - CSS handles transitions now
}

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div
    class="testimonial-slider"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <div class="slider-container">
      <button class="slider-arrow slider-arrow--prev" @click="prevSlide" aria-label="Previous testimonial">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div ref="sliderRef" class="testimonial-card">
        <div class="quote-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>

        <div class="testimonial-content">
          <div class="rating">
            <svg v-for="star in testimonials[currentIndex].rating" :key="star" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>

          <blockquote class="quote">
            "{{ testimonials[currentIndex].quote }}"
          </blockquote>

          <div class="author">
            <img :src="testimonials[currentIndex].image" :alt="testimonials[currentIndex].name" class="author-image">
            <div class="author-info">
              <h4 class="author-name">{{ testimonials[currentIndex].name }}</h4>
              <p class="author-role">{{ testimonials[currentIndex].role }}</p>
            </div>
          </div>
        </div>
      </div>

      <button class="slider-arrow slider-arrow--next" @click="nextSlide" aria-label="Next testimonial">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>

    <div class="slider-dots">
      <button
        v-for="(_, index) in testimonials"
        :key="index"
        class="dot"
        :class="{ 'dot--active': index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Go to testimonial ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.testimonial-slider {
  max-width: 900px;
  margin: 0 auto;
  min-height: 400px;
  contain: layout style;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.slider-arrow {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border-radius: 50%;
  color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.slider-arrow:hover {
  background: var(--color-primary-500);
  color: var(--text-light);
  transform: scale(1.1);
}

.testimonial-card {
  position: relative;
  flex: 1;
  background: var(--bg-primary);
  padding: var(--space-10);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  min-height: 320px;
  contain: layout style;
}

.quote-icon {
  position: absolute;
  top: var(--space-6);
  left: var(--space-6);
  color: var(--color-primary-500);
}

.testimonial-content {
  text-align: center;
}

.rating {
  display: flex;
  justify-content: center;
  gap: var(--space-1);
  margin-bottom: var(--space-6);
  color: var(--color-accent-gold);
}

.quote {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  font-style: italic;
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
  margin-bottom: var(--space-8);
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.author-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-primary-200);
}

.author-info {
  text-align: left;
}

.author-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.author-role {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-primary-200);
  transition: all var(--transition-base);
}

.dot--active {
  background: var(--color-primary-500);
  transform: scale(1.2);
}

.dot:hover {
  background: var(--color-primary-400);
}

@media (max-width: 768px) {
  .slider-container {
    flex-direction: column;
    gap: var(--space-4);
  }

  .slider-arrow {
    display: none;
  }

  .testimonial-card {
    padding: var(--space-6);
  }

  .quote {
    font-size: var(--text-lg);
  }

  .quote-icon {
    display: none;
  }
}
</style>
