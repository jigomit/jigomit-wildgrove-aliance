<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getPostBySlug, getRelatedPosts, formatDate } from '@/data/blogPosts'

gsap.registerPlugin(ScrollTrigger)
import BlogCard from '@/components/blog/BlogCard.vue'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const relatedPosts = ref([])
const contentRef = ref(null)
const isLoading = ref(true)

const formattedDate = computed(() => {
  if (!post.value) return ''
  return formatDate(post.value.date)
})

const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return ''
})

const loadPost = () => {
  isLoading.value = true
  const slug = route.params.slug
  post.value = getPostBySlug(slug)

  if (!post.value) {
    router.push('/blog')
    return
  }

  relatedPosts.value = getRelatedPosts(slug, 3)

  // Update meta tags for SEO
  document.title = `${post.value.title} - WildGrove Alliance Blog`
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', post.value.metaDescription)
  }

  // Update OG tags
  updateMetaTag('og:title', post.value.title)
  updateMetaTag('og:description', post.value.metaDescription)
  updateMetaTag('og:image', post.value.image)
  updateMetaTag('og:type', 'article')

  isLoading.value = false
}

const updateMetaTag = (property, content) => {
  let meta = document.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

watch(() => route.params.slug, loadPost)

onMounted(async () => {
  loadPost()
  await nextTick()

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 100)

  // Hero animations - immediate
  gsap.fromTo('.back-link',
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.5, delay: 0.2 }
  )
  gsap.fromTo('.hero-category',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
  )
  gsap.fromTo('.hero-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.4 }
  )
  gsap.fromTo('.author-info',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, delay: 0.5 }
  )

  // Content animation
  gsap.fromTo('.article-content',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.6 }
  )

  // Tags animation
  gsap.fromTo('.tag',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, scrollTrigger: { trigger: '.article-tags', start: 'top 90%', once: true } }
  )

  // Share buttons
  gsap.fromTo('.share-btn',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, scrollTrigger: { trigger: '.article-share', start: 'top 90%', once: true } }
  )

  // Related posts
  gsap.fromTo('.related-title',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.related-posts', start: 'top 85%', once: true } }
  )
  gsap.fromTo('.related-grid .blog-card',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, scrollTrigger: { trigger: '.related-grid', start: 'top 85%', once: true } }
  )
})
</script>

<template>
  <main class="blog-detail" v-if="post">
    <!-- JSON-LD Structured Data for SEO -->
    <component :is="'script'" type="application/ld+json">
      {{
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.image,
          "datePublished": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "WildGrove Alliance",
            "logo": {
              "@type": "ImageObject",
              "url": "/favicon.svg"
            }
          },
          "description": post.metaDescription,
          "keywords": post.keywords.join(', ')
        })
      }}
    </component>

    <!-- Hero Section -->
    <section class="blog-detail__hero">
      <div class="hero-background">
        <img
          :src="post.image"
          :alt="post.imageAlt"
          class="hero-image"
          loading="eager"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <RouterLink to="/blog" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Blog
          </RouterLink>
          <span class="hero-category">{{ post.category }}</span>
          <h1 class="hero-title">{{ post.title }}</h1>
          <div class="hero-meta">
            <div class="author-info">
              <div class="author-avatar">
                <span>{{ post.author.charAt(0) }}</span>
              </div>
              <div class="author-details">
                <span class="author-name">{{ post.author }}</span>
                <span class="post-date">
                  <time :datetime="post.date">{{ formattedDate }}</time>
                  <span class="meta-dot"></span>
                  {{ post.readTime }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <article class="blog-detail__content" ref="contentRef" itemscope itemtype="https://schema.org/Article">
      <div class="container">
        <div class="content-wrapper">
          <div class="article-body" v-html="post.content" itemprop="articleBody"></div>

          <!-- Keywords/Tags -->
          <div class="article-tags">
            <span class="tags-label">Topics:</span>
            <div class="tags-list">
              <span v-for="keyword in post.keywords" :key="keyword" class="tag">
                {{ keyword }}
              </span>
            </div>
          </div>

          <!-- Share Section -->
          <div class="article-share">
            <span class="share-label">Share this article:</span>
            <div class="share-buttons">
              <a
                :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="share-btn share-btn--twitter"
                aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="share-btn share-btn--facebook"
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="share-btn share-btn--linkedin"
                aria-label="Share on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Back to Blog Button -->
          <div class="back-to-blog">
            <RouterLink to="/blog" class="back-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Blog
            </RouterLink>
          </div>
        </div>
      </div>
    </article>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="related-posts">
      <div class="container">
        <h2 class="related-title">Related Articles</h2>
        <div class="related-grid">
          <BlogCard
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.id"
            :post="relatedPost"
          />
        </div>
      </div>
    </section>
  </main>

  <!-- Loading State -->
  <div v-else-if="isLoading" class="blog-loading">
    <div class="loading-spinner"></div>
  </div>
</template>

<style scoped>
.blog-detail {
  min-height: 100vh;
}

/* Hero Section */
.blog-detail__hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
  padding: var(--space-16) 0;
  padding-top: calc(var(--header-height) + var(--space-8));
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-image {
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.2) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  margin-bottom: var(--space-4);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--text-light);
}

.hero-category {
  display: inline-block;
  background: var(--color-primary-600);
  color: var(--text-light);
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-4);
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  color: var(--text-light);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-6);
}

.hero-meta {
  display: flex;
  align-items: center;
}

.author-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gradient-nature);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-weight: var(--font-bold);
  font-size: var(--text-lg);
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.author-name {
  color: var(--text-light);
  font-weight: var(--font-semibold);
}

.post-date {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-sm);
}

.meta-dot {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

/* Article Content */
.blog-detail__content {
  padding: var(--space-16) 0;
  background: var(--bg-white);
}

.content-wrapper {
  max-width: 750px;
  margin: 0 auto;
}

.article-body {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-neutral-700);
}

.article-body :deep(h2) {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--color-primary-900);
  margin-top: var(--space-10);
  margin-bottom: var(--space-4);
}

.article-body :deep(p) {
  margin-bottom: var(--space-6);
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin-bottom: var(--space-6);
  padding-left: var(--space-6);
}

.article-body :deep(li) {
  margin-bottom: var(--space-2);
}

.article-body :deep(strong) {
  color: var(--color-primary-800);
  font-weight: var(--font-semibold);
}

.article-body :deep(a) {
  color: var(--color-primary-600);
  text-decoration: underline;
  transition: color var(--transition-fast);
}

.article-body :deep(a:hover) {
  color: var(--color-primary-700);
}

/* Tags */
.article-tags {
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-neutral-200);
}

.tags-label {
  display: block;
  font-weight: var(--font-semibold);
  color: var(--color-neutral-700);
  margin-bottom: var(--space-3);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  padding: var(--space-1) var(--space-3);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
}

/* Share Section */
.article-share {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.share-label {
  font-weight: var(--font-semibold);
  color: var(--color-neutral-700);
}

.share-buttons {
  display: flex;
  gap: var(--space-2);
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.share-btn--twitter {
  background: #1da1f2;
  color: white;
}

.share-btn--twitter:hover {
  background: #0d8ddb;
  transform: translateY(-2px);
}

.share-btn--facebook {
  background: #1877f2;
  color: white;
}

.share-btn--facebook:hover {
  background: #0d65d9;
  transform: translateY(-2px);
}

.share-btn--linkedin {
  background: #0a66c2;
  color: white;
}

.share-btn--linkedin:hover {
  background: #0855a2;
  transform: translateY(-2px);
}

/* Back Button */
.back-to-blog {
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-neutral-200);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary-600);
  color: var(--text-light);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.back-btn:hover {
  background: var(--color-primary-700);
  transform: translateX(-4px);
}

/* Related Posts */
.related-posts {
  padding: var(--space-16) 0;
  background: var(--bg-light);
}

.related-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-900);
  text-align: center;
  margin-bottom: var(--space-10);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-8);
}

@media (min-width: 640px) {
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .related-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Loading State */
.blog-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-white);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--color-neutral-200);
  border-top-color: var(--color-primary-600);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .blog-detail__hero {
    min-height: 400px;
    padding-top: calc(var(--header-height-mobile) + var(--space-6));
    padding-bottom: var(--space-10);
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .author-avatar {
    width: 40px;
    height: 40px;
    font-size: var(--text-base);
  }

  .blog-detail__content {
    padding: var(--space-10) 0;
  }

  .article-body {
    font-size: var(--text-base);
  }

  .article-body :deep(h2) {
    font-size: var(--text-xl);
  }

  .article-share {
    flex-direction: column;
    align-items: flex-start;
  }

  .related-posts {
    padding: var(--space-10) 0;
  }

  .related-title {
    font-size: var(--text-2xl);
  }
}

@media (max-width: 480px) {
  .blog-detail__hero {
    min-height: 350px;
  }

  .hero-category {
    font-size: 0.65rem;
    padding: var(--space-1) var(--space-2);
  }

  .hero-title {
    font-size: var(--text-2xl);
  }

  .hero-excerpt {
    font-size: var(--text-sm);
  }

  .author-info {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }

  .article-container {
    padding: 0 var(--space-4);
  }

  .article-body {
    font-size: var(--text-sm);
  }

  .article-body :deep(h2) {
    font-size: var(--text-lg);
  }

  .tag {
    font-size: var(--text-xs);
  }

  .share-btn {
    width: 36px;
    height: 36px;
  }

  .back-link {
    font-size: var(--text-sm);
  }
}
</style>
