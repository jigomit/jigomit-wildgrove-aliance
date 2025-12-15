<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/common/SectionHeader.vue'
import BaseButton from '../components/common/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const formRef = ref(null)
const infoRef = ref(null)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref('')

const subjects = [
  'General Inquiry',
  'Donation Questions',
  'Volunteer Opportunities',
  'Partnership Inquiry',
  'Media & Press',
  'Other'
]

const offices = [
  {
    name: 'Global Headquarters',
    address: '123 Conservation Way, Wildlife City, WC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@wildgrovealliance.org',
    hours: 'Mon-Fri: 9AM - 6PM EST'
  },
  {
    name: 'Africa Regional Office',
    address: '45 Safari Road, Nairobi, Kenya',
    phone: '+254 20 123 4567',
    email: 'africa@wildgrovealliance.org',
    hours: 'Mon-Fri: 8AM - 5PM EAT'
  },
  {
    name: 'Asia Pacific Office',
    address: '78 Green Street, Singapore 018956',
    phone: '+65 6789 0123',
    email: 'apac@wildgrovealliance.org',
    hours: 'Mon-Fri: 9AM - 6PM SGT'
  }
]

const faqs = [
  {
    question: 'How can I make a donation?',
    answer: 'You can donate online through our secure donation page, by mail, or by phone. We accept all major credit cards, PayPal, and bank transfers.'
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes, WildGrove Alliance is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.'
  },
  {
    question: 'How do I become a volunteer?',
    answer: 'Visit our Get Involved page and fill out the volunteer application form. We offer both on-site and remote volunteer opportunities.'
  },
  {
    question: 'Do you accept corporate partnerships?',
    answer: 'Yes! We partner with companies committed to sustainability. Contact our partnerships team to discuss collaboration opportunities.'
  }
]

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = ''

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Success
  isSubmitting.value = false
  isSubmitted.value = true

  // Reset form
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
  form.newsletter = false
}

const resetForm = () => {
  isSubmitted.value = false
}

onMounted(async () => {
  await nextTick()
  ScrollTrigger.refresh()

  // Hero animations
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  heroTl
    .fromTo('.hero-badge', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
    .fromTo('.hero-title', { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6 }, '-=0.3')
    .fromTo('.hero-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')

  // Hero background
  gsap.fromTo('.hero-background img', { scale: 1.1 }, { scale: 1, duration: 1.5, ease: 'power2.out' })
  gsap.to('.hero-background img', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.contact-hero', start: 'top top', end: 'bottom top', scrub: 1 } })

  // Make all sections visible with fade
  gsap.fromTo('.contact-main', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 })
  gsap.fromTo('.offices-section', { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.offices-section', start: 'top 90%' } })
  gsap.fromTo('.faq-section', { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.faq-section', start: 'top 90%' } })

  // Form animation
  gsap.fromTo(formRef.value,
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: formRef.value, start: 'top 75%' } }
  )

  // Form fields stagger
  gsap.fromTo('.contact-form .form-group, .contact-form .form-row, .contact-form .form-checkbox',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.2, scrollTrigger: { trigger: formRef.value, start: 'top 75%' } }
  )

  // Info animation
  gsap.fromTo(infoRef.value,
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: infoRef.value, start: 'top 75%' } }
  )

  // Contact methods
  gsap.fromTo('.contact-method',
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, scrollTrigger: { trigger: '.contact-methods', start: 'top 80%' } }
  )

  // Social links
  gsap.fromTo('.social-link',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.social-card', start: 'top 80%' } }
  )

  // Offices section
  gsap.fromTo('.offices-section .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.offices-section', start: 'top 80%' } })
  gsap.fromTo('.office-card',
    { opacity: 0, y: 30, rotateY: 10 },
    { opacity: 1, y: 0, rotateY: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.offices-grid', start: 'top 75%' } }
  )

  // FAQ section
  gsap.fromTo('.faq-section .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.faq-section', start: 'top 80%' } })
  gsap.fromTo('.faq-item',
    { opacity: 0, y: 20, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.faq-grid', start: 'top 75%' } }
  )
  gsap.fromTo('.faq-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, scrollTrigger: { trigger: '.faq-cta', start: 'top 85%' } })
})
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="hero-background">
        <img
          src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1920&q=90"
          alt="Elephant walking in African wilderness"
          loading="eager"
        >
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content">
        <span class="hero-badge">Contact Us</span>
        <h1 class="hero-title">Get in Touch</h1>
        <p class="hero-description">
          Have questions about our conservation efforts? Want to get involved?
          We'd love to hear from you.
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <!-- Form -->
          <div ref="formRef" class="contact-form-wrapper">
            <!-- Success State -->
            <div v-if="isSubmitted" class="form-success">
              <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 class="success-title">Message Sent Successfully!</h3>
              <p class="success-text">Thank you for reaching out. We'll get back to you within 48 hours.</p>
              <BaseButton variant="outline" @click="resetForm">
                Send Another Message
              </BaseButton>
            </div>

            <!-- Form State -->
            <template v-else>
              <h2 class="form-title">Send Us a Message</h2>
              <p class="form-subtitle">Fill out the form below and we'll get back to you within 48 hours.</p>

              <form class="contact-form" @submit.prevent="handleSubmit">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      placeholder="John"
                      required
                      :disabled="isSubmitting"
                    >
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      :disabled="isSubmitting"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      :disabled="isSubmitting"
                    >
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      :disabled="isSubmitting"
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label for="subject">Subject *</label>
                  <select id="subject" v-model="form.subject" required :disabled="isSubmitting">
                    <option value="" disabled>Select a subject</option>
                    <option v-for="subject in subjects" :key="subject" :value="subject">
                      {{ subject }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Message *</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    required
                    :disabled="isSubmitting"
                  ></textarea>
                </div>

                <div class="form-checkbox">
                  <input
                    id="newsletter"
                    v-model="form.newsletter"
                    type="checkbox"
                    :disabled="isSubmitting"
                  >
                  <label for="newsletter">
                    Subscribe to our newsletter for conservation updates
                  </label>
                </div>

                <BaseButton type="submit" variant="primary" size="large" fullWidth :loading="isSubmitting" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  <template #icon-right v-if="!isSubmitting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </template>
              </BaseButton>
              </form>
            </template>
          </div>

          <!-- Contact Info -->
          <div ref="infoRef" class="contact-info">
            <div class="info-card">
              <h3>Quick Contact</h3>
              <div class="contact-methods">
                <a href="tel:+15551234567" class="contact-method">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div class="method-details">
                    <span class="method-label">Call Us</span>
                    <span class="method-value">+1 (555) 123-4567</span>
                  </div>
                </a>

                <a href="mailto:info@wildgrovealliance.org" class="contact-method">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div class="method-details">
                    <span class="method-label">Email Us</span>
                    <span class="method-value">info@wildgrovealliance.org</span>
                  </div>
                </a>

                <div class="contact-method">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div class="method-details">
                    <span class="method-label">Response Time</span>
                    <span class="method-value">Within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="social-card">
              <h3>Follow Us</h3>
              <p>Stay connected on social media for the latest updates.</p>
              <div class="social-links">
                <a href="#" aria-label="Facebook" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Offices Section -->
    <section class="offices-section section">
      <div class="container">
        <SectionHeader
          subtitle="Our Offices"
          title="Visit Us Worldwide"
          description="We have offices across the globe to better serve our conservation efforts and community."
        />

        <div class="offices-grid">
          <div v-for="office in offices" :key="office.name" class="office-card">
            <h3 class="office-name">{{ office.name }}</h3>

            <div class="office-details">
              <div class="detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ office.address }}</span>
              </div>

              <div class="detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>{{ office.phone }}</span>
              </div>

              <div class="detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>{{ office.email }}</span>
              </div>

              <div class="detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{{ office.hours }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section section">
      <div class="container">
        <SectionHeader
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our organization and how you can help."
        />

        <div class="faq-grid">
          <div v-for="faq in faqs" :key="faq.question" class="faq-item">
            <h3 class="faq-question">{{ faq.question }}</h3>
            <p class="faq-answer">{{ faq.answer }}</p>
          </div>
        </div>

        <div class="faq-cta">
          <p>Still have questions?</p>
          <BaseButton href="mailto:info@wildgrovealliance.org" variant="outline">
            Email Our Team
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  overflow-x: hidden;
}

/* Hero */
.contact-hero {
  position: relative;
  min-height: 50vh;
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
    rgba(13, 40, 24, 0.95) 0%,
    rgba(27, 67, 50, 0.85) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
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

/* Contact Section */
.contact-section {
  background: var(--bg-secondary);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: var(--space-12);
  align-items: start;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

/* Form */
.contact-form-wrapper {
  background: var(--bg-primary);
  padding: var(--space-10);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
}

/* Success State */
.form-success {
  text-align: center;
  padding: var(--space-10) var(--space-6);
}

.success-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-6);
  background: var(--color-primary-50);
  border-radius: 50%;
  color: var(--color-primary-500);
}

.success-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.success-text {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  margin-bottom: var(--space-8);
}

.form-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.form-subtitle {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  margin-bottom: var(--space-8);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: var(--space-4);
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary-400);
  background: var(--bg-primary);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-tertiary);
}

.form-group select {
  cursor: pointer;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.form-checkbox input {
  width: 20px;
  height: 20px;
  accent-color: var(--color-primary-500);
  cursor: pointer;
}

.form-checkbox label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  cursor: pointer;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.info-card,
.social-card {
  background: var(--bg-primary);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
}

.info-card h3,
.social-card h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-method {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.contact-method:hover {
  background: var(--color-primary-50);
}

.method-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-100);
  border-radius: var(--radius-lg);
  color: var(--color-primary-600);
}

.method-details {
  display: flex;
  flex-direction: column;
}

.method-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.method-value {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.social-card p {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.social-links {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.social-link:hover {
  background: var(--color-primary-500);
  color: var(--text-light);
}

/* Offices Section */
.offices-section {
  background: var(--bg-primary);
}

.offices-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

@media (max-width: 1024px) {
  .offices-grid {
    grid-template-columns: 1fr;
  }
}

.office-card {
  background: var(--bg-secondary);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  transition: all var(--transition-base);
}

.office-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.office-name {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid var(--color-primary-200);
}

.office-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.detail svg {
  flex-shrink: 0;
  color: var(--color-primary-500);
  margin-top: 2px;
}

/* FAQ Section */
.faq-section {
  background: var(--bg-secondary);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

@media (max-width: 768px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}

.faq-item {
  background: var(--bg-primary);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.faq-question {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.faq-answer {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

.faq-cta {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.faq-cta p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contact-hero {
    min-height: 45vh;
    padding-top: calc(var(--header-height-mobile) + var(--space-8));
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-description {
    font-size: var(--text-lg);
  }

  .contact-form-wrapper {
    padding: var(--space-6);
  }

  .form-title {
    font-size: var(--text-xl);
  }

  .info-card,
  .social-card {
    padding: var(--space-6);
  }

  .contact-method {
    padding: var(--space-3);
    gap: var(--space-3);
  }

  .method-icon {
    width: 40px;
    height: 40px;
  }

  .method-value {
    font-size: var(--text-sm);
    word-break: break-all;
  }

  .office-card {
    padding: var(--space-6);
  }

  .office-name {
    font-size: var(--text-lg);
  }

  .faq-question {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .contact-hero {
    min-height: 40vh;
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

  .social-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
