<script setup>
import { computed } from 'vue'
import { formatDate } from '@/data/blogPosts'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => formatDate(props.post.date))
</script>

<template>
  <article class="blog-card" itemscope itemtype="https://schema.org/BlogPosting">
    <RouterLink :to="`/blog/${post.slug}`" class="blog-card__link">
      <div class="blog-card__image-wrapper">
        <img
          :src="post.image"
          :alt="post.imageAlt"
          class="blog-card__image"
          loading="lazy"
          itemprop="image"
        />
        <span class="blog-card__category">{{ post.category }}</span>
      </div>
      <div class="blog-card__content">
        <div class="blog-card__meta">
          <time :datetime="post.date" itemprop="datePublished">{{ formattedDate }}</time>
          <span class="blog-card__dot"></span>
          <span>{{ post.readTime }}</span>
        </div>
        <h3 class="blog-card__title" itemprop="headline">{{ post.title }}</h3>
        <p class="blog-card__excerpt" itemprop="description">{{ post.excerpt }}</p>
        <span class="blog-card__read-more">
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </RouterLink>
    <meta itemprop="author" :content="post.author" />
  </article>
</template>

<style scoped>
.blog-card {
  background: var(--bg-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.blog-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.blog-card__image-wrapper {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.blog-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.blog-card:hover .blog-card__image {
  transform: scale(1.08);
}

.blog-card__category {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  background: var(--color-primary-600);
  color: var(--text-light);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.blog-card__content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-neutral-500);
  font-size: var(--text-sm);
  margin-bottom: var(--space-3);
}

.blog-card__dot {
  width: 4px;
  height: 4px;
  background: var(--color-neutral-400);
  border-radius: 50%;
}

.blog-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-primary-900);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-3);
  transition: color var(--transition-fast);
}

.blog-card:hover .blog-card__title {
  color: var(--color-primary-600);
}

.blog-card__excerpt {
  font-size: var(--text-base);
  color: var(--color-neutral-600);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary-600);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
  margin-top: auto;
}

.blog-card__read-more svg {
  transition: transform var(--transition-fast);
}

.blog-card:hover .blog-card__read-more {
  color: var(--color-primary-700);
}

.blog-card:hover .blog-card__read-more svg {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 640px) {
  .blog-card:hover {
    transform: translateY(-4px);
  }

  .blog-card__content {
    padding: var(--space-4);
  }

  .blog-card__title {
    font-size: var(--text-lg);
  }

  .blog-card__excerpt {
    font-size: var(--text-sm);
    -webkit-line-clamp: 3;
  }

  .blog-card__category {
    top: var(--space-2);
    left: var(--space-2);
    padding: var(--space-1) var(--space-2);
    font-size: 0.65rem;
  }

  .blog-card__meta {
    font-size: var(--text-xs);
  }
}

@media (max-width: 480px) {
  .blog-card__image-wrapper {
    aspect-ratio: 16 / 9;
  }

  .blog-card__title {
    font-size: var(--text-base);
  }
}
</style>
