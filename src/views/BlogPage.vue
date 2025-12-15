<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlogCard from '@/components/blog/BlogCard.vue'
import { getAllPosts, getAllCategories } from '@/data/blogPosts'

gsap.registerPlugin(ScrollTrigger)

const posts = ref(getAllPosts())
const categories = ref(['All', ...getAllCategories()])
const activeCategory = ref('All')
const heroRef = ref(null)
const cardsRef = ref(null)

const filteredPosts = computed(() => {
  if (activeCategory.value === 'All') {
    return posts.value
  }
  return posts.value.filter(post => post.category === activeCategory.value)
})

const filterByCategory = (category) => {
  activeCategory.value = category
}

onMounted(async () => {
  await nextTick()

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 100)

  // Hero animations - immediate
  gsap.fromTo('.blog-hero__badge',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
  )
  gsap.fromTo('.blog-hero__title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, delay: 0.4 }
  )
  gsap.fromTo('.blog-hero__subtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.6 }
  )

  // Filter buttons
  gsap.fromTo('.filter-btn',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.8 }
  )

  // Blog cards animation
  gsap.fromTo('.blog-card',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.blog-grid', start: 'top 85%', once: true } }
  )

  // CTA section
  gsap.fromTo('.cta-content',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.blog-cta', start: 'top 80%', once: true } }
  )
})
</script>

<template>
  <main class="blog-page">
    <!-- SEO-optimized Hero Section -->
    <section class="blog-hero" ref="heroRef">
      <div class="blog-hero__background">
        <div class="blog-hero__overlay"></div>
      </div>
      <div class="container">
        <div class="blog-hero__content">
          <span class="blog-hero__badge">Wildlife Conservation NGO</span>
          <h1 class="blog-hero__title">Blog</h1>
          <p class="blog-hero__subtitle">
            Explore insights, stories, and updates from our wildlife conservation efforts around the world.
            Stay informed about endangered species protection and habitat restoration.
          </p>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="blog-filters">
      <div class="container">
        <div class="filter-buttons">
          <button
            v-for="category in categories"
            :key="category"
            class="filter-btn"
            :class="{ 'filter-btn--active': activeCategory === category }"
            @click="filterByCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="blog-grid-section" ref="cardsRef">
      <div class="container">
        <div v-if="filteredPosts.length > 0" class="blog-grid">
          <BlogCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
          />
        </div>
        <div v-else class="blog-empty">
          <p>No posts found in this category.</p>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="blog-cta">
      <div class="container">
        <div class="cta-content">
          <h2>Stay Updated on Wildlife Conservation</h2>
          <p>Subscribe to receive the latest news, stories, and insights from our conservation efforts.</p>
          <RouterLink to="/contact" class="cta-btn">
            Get In Touch
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.blog-page {
  min-height: 100vh;
}

/* Hero Section */
.blog-hero {
  position: relative;
  padding: calc(var(--header-height) + var(--space-16)) 0 var(--space-16);
  min-height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.blog-hero__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&q=80') center/cover no-repeat;
}

.blog-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(27, 67, 50, 0.92) 0%, rgba(45, 90, 39, 0.85) 100%);
}

.blog-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.blog-hero__badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-accent-gold);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  margin-bottom: var(--space-4);
  backdrop-filter: blur(10px);
}

.blog-hero__title {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  color: var(--text-light);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.blog-hero__subtitle {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.9);
  line-height: var(--leading-relaxed);
  max-width: 600px;
  margin: 0 auto;
}

/* Category Filters */
.blog-filters {
  padding: var(--space-8) 0;
  background: var(--bg-light);
  border-bottom: 1px solid var(--color-neutral-200);
  position: sticky;
  top: var(--header-height);
  z-index: 10;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
}

.filter-btn {
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  background: var(--bg-white);
  color: var(--color-neutral-600);
  border: 1px solid var(--color-neutral-300);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  border-color: var(--color-primary-300);
}

.filter-btn--active {
  background: var(--color-primary-600);
  color: var(--text-light);
  border-color: var(--color-primary-600);
}

.filter-btn--active:hover {
  background: var(--color-primary-700);
  color: var(--text-light);
}

/* Blog Grid */
.blog-grid-section {
  padding: var(--space-16) 0;
  background: var(--bg-white);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-8);
}

@media (min-width: 640px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.blog-empty {
  text-align: center;
  padding: var(--space-16) 0;
  color: var(--color-neutral-500);
}

/* CTA Section */
.blog-cta {
  padding: var(--space-20) 0;
  background: var(--gradient-nature);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text-light);
  margin-bottom: var(--space-4);
}

.cta-content p {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-8);
  line-height: var(--leading-relaxed);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  background: var(--color-accent-gold);
  color: var(--color-primary-900);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.cta-btn:hover {
  background: var(--color-accent-amber);
  transform: translateY(-2px);
}

.cta-btn svg {
  transition: transform var(--transition-fast);
}

.cta-btn:hover svg {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .blog-hero {
    padding: calc(var(--header-height-mobile) + var(--space-12)) 0 var(--space-12);
    min-height: 350px;
  }

  .blog-hero__title {
    font-size: var(--text-4xl);
  }

  .blog-hero__subtitle {
    font-size: var(--text-base);
  }

  .blog-filters {
    top: var(--header-height-mobile);
    padding: var(--space-4) 0;
  }

  .filter-buttons {
    gap: var(--space-2);
  }

  .filter-btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-xs);
  }

  .blog-grid-section {
    padding: var(--space-10) 0;
  }

  .blog-cta {
    padding: var(--space-12) 0;
  }

  .cta-content h2 {
    font-size: var(--text-2xl);
  }
}
</style>
