<script setup>
import { ref } from 'vue'

const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')
const isSubscribing = ref(false)
const isSubscribed = ref(false)

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value) return

  isSubscribing.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubscribing.value = false
  isSubscribed.value = true
  newsletterEmail.value = ''

  // Reset after 5 seconds
  setTimeout(() => {
    isSubscribed.value = false
  }, 5000)
}

const footerLinks = {
  explore: [
    { name: 'About Us', path: '/about' },
    { name: 'Our Programs', path: '/programs' },
    { name: 'Success Stories', path: '/programs#success' },
    { name: 'Get Involved', path: '/get-involved' }
  ],
  getInvolved: [
    { name: 'Volunteer', path: '/get-involved#volunteer' },
    { name: 'Donate', path: '/get-involved#donate' },
    { name: 'Partner With Us', path: '/get-involved#partner' },
    { name: 'Careers', path: '/about#careers' }
  ],
  resources: [
    { name: 'Blog', path: '/blog' },
    { name: 'Wildlife Guide', path: '/programs#guide' },
    { name: 'Research Papers', path: '/about#research' },
    { name: 'Annual Reports', path: '/about#reports' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/' },
  { name: 'Twitter', icon: 'twitter', url: 'https://www.x.com/' },
  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/' },
  { name: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/' }
]
</script>

<template>
  <footer class="footer">
    <!-- Newsletter Section -->
    <div class="footer-newsletter">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h3>Stay Connected With Nature</h3>
            <p>Subscribe to our newsletter for updates on wildlife conservation efforts and how you can help.</p>
          </div>
          <div class="newsletter-form">
            <!-- Success State -->
            <div v-if="isSubscribed" class="newsletter-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Thank you for subscribing!</span>
            </div>

            <!-- Form State -->
            <form v-else @submit.prevent="handleNewsletterSubmit">
              <div class="input-group">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Enter your email address"
                  class="newsletter-input"
                  required
                  :disabled="isSubscribing"
                >
                <button type="submit" class="newsletter-btn" :disabled="isSubscribing">
                  <span v-if="isSubscribing">Subscribing...</span>
                  <template v-else>
                    Subscribe
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </template>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand">
            <RouterLink to="/" class="footer-logo">
              <svg viewBox="0 0 100 100" class="logo-icon">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4A7C59" />
                    <stop offset="100%" style="stop-color:#81C784" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#footerLogoGrad)"/>
                <path d="M50 20 C30 35 25 55 35 70 C40 60 45 50 50 45 C55 50 60 60 65 70 C75 55 70 35 50 20" fill="#E8F5E9"/>
                <path d="M50 30 L50 65" stroke="#2D5A27" stroke-width="2" fill="none"/>
              </svg>
              <span class="logo-text">WildGrove Alliance</span>
            </RouterLink>
            <p class="footer-description">
              Dedicated to protecting wildlife and preserving natural habitats for future generations.
              Together, we can make a difference.
            </p>
            <div class="footer-social">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" class="social-link" :aria-label="social.name" target="_blank" rel="noopener noreferrer">
                <svg v-if="social.icon === 'facebook'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <svg v-if="social.icon === 'twitter'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <svg v-if="social.icon === 'instagram'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <svg v-if="social.icon === 'youtube'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <svg v-if="social.icon === 'linkedin'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Links Columns -->
          <div class="footer-links">
            <div class="footer-column">
              <h4 class="column-title">Explore</h4>
              <ul class="column-list">
                <li v-for="link in footerLinks.explore" :key="link.name">
                  <RouterLink :to="link.path" class="column-link">{{ link.name }}</RouterLink>
                </li>
              </ul>
            </div>

            <div class="footer-column">
              <h4 class="column-title">Get Involved</h4>
              <ul class="column-list">
                <li v-for="link in footerLinks.getInvolved" :key="link.name">
                  <RouterLink :to="link.path" class="column-link">{{ link.name }}</RouterLink>
                </li>
              </ul>
            </div>

            <div class="footer-column">
              <h4 class="column-title">Resources</h4>
              <ul class="column-list">
                <li v-for="link in footerLinks.resources" :key="link.name">
                  <RouterLink :to="link.path" class="column-link">{{ link.name }}</RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Contact Column -->
          <div class="footer-contact">
            <h4 class="column-title">Contact Us</h4>
            <address class="contact-info">
              <div class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>123 Conservation Way<br>Wildlife City, WC 12345</span>
              </div>
              <div class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@wildgrovealliance.org</span>
              </div>
            </address>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom__content">
          <p class="copyright">&copy; {{ currentYear }} WildGrove Alliance. All rights reserved.</p>
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-darker);
  color: var(--text-light);
}

/* Newsletter Section */
.footer-newsletter {
  background: var(--gradient-nature);
  padding: var(--space-16) 0;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: center;
}

@media (min-width: 768px) {
  .newsletter-content {
    grid-template-columns: 1fr 1fr;
  }
}

.newsletter-text h3 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-3);
  color: var(--text-light);
}

.newsletter-text p {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-base);
}

.newsletter-form {
  width: 100%;
}

.input-group {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  padding: var(--space-1);
  backdrop-filter: blur(10px);
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
  color: var(--text-light);
  outline: none;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-accent-gold);
  color: var(--color-primary-900);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-full);
  font-weight: var(--font-semibold);
  transition: all var(--transition-base);
}

.newsletter-btn:hover:not(:disabled) {
  background: var(--color-accent-amber);
  transform: translateX(5px);
}

.newsletter-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.newsletter-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.newsletter-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  color: var(--color-accent-gold);
  font-weight: var(--font-semibold);
  animation: fadeIn 0.3s ease;
}

.newsletter-success svg {
  color: var(--color-accent-gold);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Main Footer */
.footer-main {
  padding: var(--space-16) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 2fr 3fr 2fr;
  }
}

/* Brand Column */
.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.footer-logo .logo-icon {
  width: 48px;
  height: 48px;
}

.footer-logo .logo-text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-light);
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.footer-social {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  color: var(--text-light);
  transition: all var(--transition-base);
}

.social-link:hover {
  background: var(--color-primary-500);
  transform: translateY(-3px);
  color: var(--text-light);
}

/* Footer Links */
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

@media (max-width: 640px) {
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

.column-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-light);
  margin-bottom: var(--space-6);
}

.column-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.column-link {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}

.column-link:hover {
  color: var(--color-accent-gold);
  padding-left: var(--space-2);
}

/* Contact Column */
.footer-contact {
  max-width: 250px;
}

.contact-info {
  font-style: normal;
}

.contact-item {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-sm);
}

.contact-item svg {
  flex-shrink: 0;
  color: var(--color-accent-gold);
}

/* Footer Bottom */
.footer-bottom {
  padding: var(--space-6) 0;
}

.footer-bottom__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom__content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.copyright {
  color: rgba(255, 255, 255, 0.5);
  font-size: var(--text-sm);
}

.legal-links {
  display: flex;
  gap: var(--space-6);
}

.legal-links a {
  color: rgba(255, 255, 255, 0.5);
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.legal-links a:hover {
  color: var(--text-light);
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .footer-newsletter {
    padding: var(--space-10) 0;
  }

  .newsletter-text h3 {
    font-size: var(--text-2xl);
  }

  .newsletter-text p {
    font-size: var(--text-sm);
  }

  .input-group {
    flex-direction: column;
    border-radius: var(--radius-xl);
    gap: var(--space-2);
    padding: var(--space-2);
  }

  .newsletter-input {
    padding: var(--space-3) var(--space-4);
    text-align: center;
  }

  .newsletter-btn {
    width: 100%;
    justify-content: center;
    padding: var(--space-3) var(--space-4);
  }

  .footer-main {
    padding: var(--space-10) 0;
  }

  .footer-brand {
    max-width: 100%;
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-links {
    text-align: center;
  }

  .column-link:hover {
    padding-left: 0;
  }

  .footer-contact {
    max-width: 100%;
    text-align: center;
  }

  .contact-item {
    justify-content: center;
  }

  .legal-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-4);
  }
}

@media (max-width: 480px) {
  .newsletter-text h3 {
    font-size: var(--text-xl);
  }

  .column-title {
    font-size: var(--text-base);
    margin-bottom: var(--space-4);
  }

  .column-list {
    gap: var(--space-2);
  }

  .social-link {
    width: 36px;
    height: 36px;
  }

  .footer-logo .logo-icon {
    width: 40px;
    height: 40px;
  }

  .footer-logo .logo-text {
    font-size: var(--text-lg);
  }
}
</style>
