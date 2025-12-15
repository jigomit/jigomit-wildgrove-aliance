<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/common/SectionHeader.vue'
import BaseButton from '../components/common/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const donationRef = ref([])
const volunteerRef = ref(null)

// Donation form state
const selectedAmount = ref(250)
const customAmount = ref('')
const isDonating = ref(false)
const donationSuccess = ref(false)
const donationError = ref('')

// Volunteer modal state
const showVolunteerModal = ref(false)
const selectedOpportunity = ref(null)
const isSubmittingVolunteer = ref(false)
const volunteerSuccess = ref(false)
const volunteerForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

// Donation tier modal state
const showDonationModal = ref(false)
const selectedTier = ref(null)
const isProcessingTier = ref(false)
const tierSuccess = ref(false)
const donorForm = ref({
  name: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const selectTier = (tier) => {
  selectedTier.value = tier
  showDonationModal.value = true
}

const closeDonationModal = () => {
  showDonationModal.value = false
  selectedTier.value = null
  tierSuccess.value = false
  donorForm.value = { name: '', email: '', cardNumber: '', expiry: '', cvv: '' }
}

const processTierDonation = async () => {
  if (!donorForm.value.name || !donorForm.value.email) {
    return
  }

  isProcessingTier.value = true

  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))

  isProcessingTier.value = false
  tierSuccess.value = true

  // Close modal after 3 seconds
  setTimeout(() => {
    closeDonationModal()
  }, 3000)
}

const selectAmount = (amount) => {
  selectedAmount.value = amount
  customAmount.value = ''
}

const handleCustomAmountChange = (e) => {
  customAmount.value = e.target.value
  if (e.target.value) {
    selectedAmount.value = null
  }
}

const handleDonation = async () => {
  const amount = customAmount.value || selectedAmount.value
  if (!amount || amount < 1) {
    donationError.value = 'Please select or enter a donation amount'
    return
  }

  isDonating.value = true
  donationError.value = ''

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  isDonating.value = false
  donationSuccess.value = true

  // Reset after 5 seconds
  setTimeout(() => {
    donationSuccess.value = false
    selectedAmount.value = 250
    customAmount.value = ''
  }, 5000)
}

const openVolunteerModal = (opportunity) => {
  selectedOpportunity.value = opportunity
  showVolunteerModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeVolunteerModal = () => {
  showVolunteerModal.value = false
  document.body.style.overflow = ''
  volunteerSuccess.value = false
  volunteerForm.value = { name: '', email: '', phone: '', message: '' }
}

const handleVolunteerSubmit = async () => {
  if (!volunteerForm.value.name || !volunteerForm.value.email) return

  isSubmittingVolunteer.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  isSubmittingVolunteer.value = false
  volunteerSuccess.value = true
}

const donationTiers = [
  {
    name: 'Supporter',
    amount: 25,
    description: 'Feed an animal for one month',
    features: [
      'Monthly impact newsletter',
      'Digital thank you certificate',
      'Tax-deductible receipt'
    ],
    popular: false
  },
  {
    name: 'Protector',
    amount: 100,
    description: 'Plant 50 native trees',
    features: [
      'All Supporter benefits',
      'Exclusive wildlife wallpapers',
      'Quarterly impact report',
      'Name on our donor wall'
    ],
    popular: true
  },
  {
    name: 'Guardian',
    amount: 500,
    description: 'Fund a rescue operation',
    features: [
      'All Protector benefits',
      'Virtual field trip experience',
      'Personal impact story',
      'Priority event invitations'
    ],
    popular: false
  },
  {
    name: 'Champion',
    amount: 1000,
    description: 'Protect an acre of habitat',
    features: [
      'All Guardian benefits',
      'Name a rescued animal',
      'Annual VIP sanctuary tour',
      'Direct conservationist chat'
    ],
    popular: false
  }
]

const volunteerOpportunities = [
  {
    title: 'Field Conservation',
    location: 'On-site',
    duration: '2-12 weeks',
    description: 'Work directly with wildlife in our sanctuaries and reserves.',
    requirements: ['Age 18+', 'Physical fitness', 'Training provided']
  },
  {
    title: 'Community Educator',
    location: 'Local & Remote',
    duration: 'Flexible',
    description: 'Teach communities about wildlife conservation and sustainability.',
    requirements: ['Communication skills', 'Teaching experience helpful']
  },
  {
    title: 'Digital Ambassador',
    location: 'Remote',
    duration: 'Flexible',
    description: 'Help spread our message through social media and content creation.',
    requirements: ['Social media savvy', 'Creative skills', 'Reliable internet']
  },
  {
    title: 'Research Assistant',
    location: 'Various',
    duration: '3-6 months',
    description: 'Support our scientists in wildlife research and data collection.',
    requirements: ['Science background', 'Attention to detail', 'Data entry skills']
  }
]

onMounted(async () => {
  await nextTick()
  ScrollTrigger.refresh()

  // Hero animations
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  heroTl
    .fromTo('.hero-badge', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
    .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .fromTo('.hero-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .fromTo('.hero-actions .btn', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1 }, '-=0.2')

  // Hero background
  gsap.fromTo('.hero-background img', { scale: 1.1 }, { scale: 1, duration: 1.5, ease: 'power2.out' })
  gsap.to('.hero-background img', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.involvement-hero', start: 'top top', end: 'bottom top', scrub: 1 } })

  // Make all sections visible with fade
  gsap.fromTo('.donation-section', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 })
  gsap.fromTo('.volunteer-section', { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.volunteer-section', start: 'top 90%' } })
  gsap.fromTo('.partner-section', { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.partner-section', start: 'top 90%' } })
  gsap.fromTo('.other-ways', { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.other-ways', start: 'top 90%' } })

  // Donation section header
  gsap.fromTo('.donation-section .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.donation-section', start: 'top 80%' } })

  // Donation cards animation
  gsap.fromTo(donationRef.value,
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.donation-grid', start: 'top 75%' } }
  )

  // One-time donation
  gsap.fromTo('.one-time-donation', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.one-time-donation', start: 'top 80%' } })

  // Volunteer section header
  gsap.fromTo('.volunteer-section .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.volunteer-section', start: 'top 80%' } })

  // Volunteer cards
  gsap.fromTo('.volunteer-card',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.volunteer-grid', start: 'top 75%' } }
  )

  // Partner section
  const partnerTl = gsap.timeline({ scrollTrigger: { trigger: '.partner-section', start: 'top 70%' } })
  partnerTl
    .fromTo('.partner-content .section-subtitle', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 })
    .fromTo('.partner-content .section-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    .fromTo('.partner-text', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    .fromTo('.partnership-types .type', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, '-=0.2')
  gsap.fromTo('.partner-image', { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.partner-image', start: 'top 75%' } })

  // Other ways section
  gsap.fromTo('.other-ways .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.other-ways', start: 'top 80%' } })
  gsap.fromTo('.way-card',
    { opacity: 0, y: 30, rotateX: 10 },
    { opacity: 1, y: 0, rotateX: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.ways-grid', start: 'top 75%' } }
  )

  // Way card icons animation
  gsap.fromTo('.way-icon',
    { scale: 0, rotate: -45 },
    { scale: 1, rotate: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.2, scrollTrigger: { trigger: '.ways-grid', start: 'top 75%' } }
  )

  // Volunteer CTA animation
  gsap.fromTo('.volunteer-cta',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: '.volunteer-cta', start: 'top 85%' } }
  )

  // Donation tier features animation
  gsap.fromTo('.tier-features li',
    { opacity: 0, x: -15 },
    { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, scrollTrigger: { trigger: '.donation-grid', start: 'top 70%' } }
  )

  // Amount buttons animation
  gsap.fromTo('.amount-btn',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.one-time-donation', start: 'top 80%' } }
  )
})
</script>

<template>
  <div class="get-involved-page">
    <!-- Hero Section -->
    <section class="involvement-hero">
      <div class="hero-background">
        <img
          src="https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=1920&q=90"
          alt="Elephant herd in wildlife sanctuary"
          loading="eager"
        >
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content">
        <span class="hero-badge">Get Involved</span>
        <h1 class="hero-title">Join the<br>Conservation Movement</h1>
        <p class="hero-description">
          Every action counts. Donate, volunteer, or partner with us
          to protect wildlife and preserve our planet for future generations.
        </p>

        <div class="hero-actions">
          <BaseButton href="#donate" size="large" variant="primary">
            Donate Now
          </BaseButton>
          <BaseButton href="#volunteer" size="large" variant="light">
            Volunteer With Us
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Donation Section -->
    <section id="donate" class="donation-section section">
      <div class="container">
        <SectionHeader
          subtitle="Make a Donation"
          title="Your Gift Saves Lives"
          description="100% of your donation goes directly to conservation efforts. Choose a giving level that works for you."
        />

        <div class="donation-grid">
          <article
            v-for="(tier, index) in donationTiers"
            :key="tier.name"
            :ref="el => donationRef[index] = el"
            class="donation-card"
            :class="{ 'donation-card--popular': tier.popular }"
          >
            <div v-if="tier.popular" class="popular-badge">Most Popular</div>

            <h3 class="tier-name">{{ tier.name }}</h3>
            <div class="tier-amount">
              <span class="currency">$</span>
              <span class="amount">{{ tier.amount }}</span>
              <span class="period">/month</span>
            </div>
            <p class="tier-description">{{ tier.description }}</p>

            <ul class="tier-features">
              <li v-for="feature in tier.features" :key="feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ feature }}
              </li>
            </ul>

            <BaseButton
              :variant="tier.popular ? 'primary' : 'outline'"
              fullWidth
              @click="selectTier(tier)"
            >
              Choose {{ tier.name }}
            </BaseButton>
          </article>
        </div>

        <!-- One-time donation -->
        <div class="one-time-donation">
          <h3>Prefer a one-time donation?</h3>

          <!-- Success State -->
          <div v-if="donationSuccess" class="donation-success">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h4>Thank You for Your Generosity!</h4>
            <p>Your donation of ${{ customAmount || selectedAmount }} will help protect wildlife and preserve natural habitats.</p>
          </div>

          <!-- Form State -->
          <div v-else class="custom-amount">
            <div class="amount-options">
              <button
                v-for="amount in [50, 100, 250, 500, 1000]"
                :key="amount"
                type="button"
                class="amount-btn"
                :class="{ 'active': selectedAmount === amount && !customAmount }"
                @click.prevent="selectAmount(amount)"
                :disabled="isDonating"
              >
                ${{ amount }}
              </button>
            </div>
            <div class="custom-input">
              <span class="currency-symbol">$</span>
              <input
                type="number"
                placeholder="Other amount"
                min="1"
                :value="customAmount"
                @input="handleCustomAmountChange"
                :disabled="isDonating"
              >
            </div>
            <p v-if="donationError" class="donation-error">{{ donationError }}</p>
            <BaseButton
              variant="primary"
              size="large"
              @click="handleDonation"
              :disabled="isDonating"
            >
              <span v-if="isDonating">Processing...</span>
              <span v-else>Donate Now</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Volunteer Section -->
    <section id="volunteer" ref="volunteerRef" class="volunteer-section section">
      <div class="container">
        <SectionHeader
          subtitle="Volunteer"
          title="Make a Hands-On Impact"
          description="Join our global network of volunteers and contribute your time and skills to wildlife conservation."
          :light="true"
        />

        <div class="volunteer-grid">
          <article
            v-for="opportunity in volunteerOpportunities"
            :key="opportunity.title"
            class="volunteer-card"
          >
            <div class="card-header">
              <h3 class="card-title">{{ opportunity.title }}</h3>
              <div class="card-meta">
                <span class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {{ opportunity.location }}
                </span>
                <span class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ opportunity.duration }}
                </span>
              </div>
            </div>

            <p class="card-description">{{ opportunity.description }}</p>

            <div class="card-requirements">
              <span class="req-label">Requirements:</span>
              <ul>
                <li v-for="req in opportunity.requirements" :key="req">{{ req }}</li>
              </ul>
            </div>

            <BaseButton variant="light" fullWidth @click="openVolunteerModal(opportunity)">
              Apply Now
            </BaseButton>
          </article>
        </div>

        <div class="volunteer-cta">
          <p>Have questions about volunteering?</p>
          <BaseButton to="/contact" variant="outline">
            Contact Our Team
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Partner Section -->
    <section id="partner" class="partner-section section">
      <div class="container">
        <div class="partner-grid">
          <div class="partner-content">
            <span class="section-subtitle">Corporate Partnership</span>
            <h2 class="section-title">Partner With Us</h2>
            <p class="partner-text">
              We work with forward-thinking companies committed to environmental sustainability.
              Partner with WildGrove Alliance to make a meaningful impact on wildlife conservation
              while engaging your employees and customers.
            </p>

            <div class="partnership-types">
              <div class="type">
                <h4>Sponsorship</h4>
                <p>Sponsor specific conservation programs or events.</p>
              </div>
              <div class="type">
                <h4>Cause Marketing</h4>
                <p>Align your brand with wildlife protection campaigns.</p>
              </div>
              <div class="type">
                <h4>Employee Engagement</h4>
                <p>Organize team volunteer experiences and donations.</p>
              </div>
              <div class="type">
                <h4>Matching Gifts</h4>
                <p>Double the impact of your employees' donations.</p>
              </div>
            </div>

            <BaseButton to="/contact" variant="primary" size="large">
              Discuss Partnership
            </BaseButton>
          </div>

          <div class="partner-image">
            <img
              src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&q=90"
              alt="Flamingos in natural habitat"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Other Ways Section -->
    <section class="other-ways section">
      <div class="container">
        <SectionHeader
          subtitle="Other Ways to Help"
          title="Every Action Matters"
          description="There are many ways to support wildlife conservation beyond donations and volunteering."
        />

        <div class="ways-grid">
          <div class="way-card">
            <div class="way-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </div>
            <h3>Share Our Mission</h3>
            <p>Spread awareness on social media and within your community.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <h3>Legacy Giving</h3>
            <p>Include WildGrove Alliance in your estate planning.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <h3>Shop With Purpose</h3>
            <p>Purchase from our eco-friendly merchandise store.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Start a Fundraiser</h3>
            <p>Create your own campaign for birthdays or special events.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Volunteer Application Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showVolunteerModal" class="modal-overlay" @click.self="closeVolunteerModal">
          <div class="modal-content">
            <button class="modal-close" @click="closeVolunteerModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <!-- Success State -->
            <div v-if="volunteerSuccess" class="modal-success">
              <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Application Submitted!</h3>
              <p>Thank you for your interest in volunteering for {{ selectedOpportunity?.title }}. Our team will review your application and contact you within 3-5 business days.</p>
              <BaseButton variant="primary" @click="closeVolunteerModal">
                Close
              </BaseButton>
            </div>

            <!-- Form State -->
            <template v-else>
              <div class="modal-header">
                <h3>Apply for {{ selectedOpportunity?.title }}</h3>
                <p>{{ selectedOpportunity?.description }}</p>
              </div>

              <form class="modal-form" @submit.prevent="handleVolunteerSubmit">
                <div class="form-group">
                  <label for="volunteer-name">Full Name *</label>
                  <input
                    id="volunteer-name"
                    type="text"
                    v-model="volunteerForm.name"
                    required
                    :disabled="isSubmittingVolunteer"
                    placeholder="Enter your full name"
                  >
                </div>

                <div class="form-group">
                  <label for="volunteer-email">Email Address *</label>
                  <input
                    id="volunteer-email"
                    type="email"
                    v-model="volunteerForm.email"
                    required
                    :disabled="isSubmittingVolunteer"
                    placeholder="Enter your email"
                  >
                </div>

                <div class="form-group">
                  <label for="volunteer-phone">Phone Number</label>
                  <input
                    id="volunteer-phone"
                    type="tel"
                    v-model="volunteerForm.phone"
                    :disabled="isSubmittingVolunteer"
                    placeholder="Enter your phone number"
                  >
                </div>

                <div class="form-group">
                  <label for="volunteer-message">Why do you want to volunteer?</label>
                  <textarea
                    id="volunteer-message"
                    v-model="volunteerForm.message"
                    rows="4"
                    :disabled="isSubmittingVolunteer"
                    placeholder="Tell us about yourself and why you're interested..."
                  ></textarea>
                </div>

                <BaseButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  :disabled="isSubmittingVolunteer"
                >
                  <span v-if="isSubmittingVolunteer">Submitting...</span>
                  <span v-else>Submit Application</span>
                </BaseButton>
              </form>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Donation Tier Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDonationModal" class="modal-overlay" @click.self="closeDonationModal">
          <div class="modal-content donation-modal">
            <button class="modal-close" @click="closeDonationModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <!-- Success State -->
            <div v-if="tierSuccess" class="modal-success">
              <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Thank You for Your Support!</h3>
              <p>Your {{ selectedTier?.name }} membership (${{ selectedTier?.amount }}/month) has been set up successfully. You'll receive a confirmation email shortly.</p>
              <BaseButton variant="primary" @click="closeDonationModal">
                Close
              </BaseButton>
            </div>

            <!-- Form State -->
            <template v-else>
              <div class="modal-header">
                <div class="tier-badge">{{ selectedTier?.name }}</div>
                <h3>Complete Your Donation</h3>
                <p class="tier-price">${{ selectedTier?.amount }}<span>/month</span></p>
                <p class="tier-impact">{{ selectedTier?.description }}</p>
              </div>

              <form class="modal-form" @submit.prevent="processTierDonation">
                <div class="form-group">
                  <label for="donor-name">Full Name *</label>
                  <input
                    id="donor-name"
                    type="text"
                    v-model="donorForm.name"
                    required
                    :disabled="isProcessingTier"
                    placeholder="Enter your full name"
                  >
                </div>

                <div class="form-group">
                  <label for="donor-email">Email Address *</label>
                  <input
                    id="donor-email"
                    type="email"
                    v-model="donorForm.email"
                    required
                    :disabled="isProcessingTier"
                    placeholder="Enter your email"
                  >
                </div>

                <div class="form-group">
                  <label for="card-number">Card Number *</label>
                  <input
                    id="card-number"
                    type="text"
                    v-model="donorForm.cardNumber"
                    required
                    :disabled="isProcessingTier"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="expiry">Expiry Date *</label>
                    <input
                      id="expiry"
                      type="text"
                      v-model="donorForm.expiry"
                      required
                      :disabled="isProcessingTier"
                      placeholder="MM/YY"
                      maxlength="5"
                    >
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV *</label>
                    <input
                      id="cvv"
                      type="text"
                      v-model="donorForm.cvv"
                      required
                      :disabled="isProcessingTier"
                      placeholder="123"
                      maxlength="4"
                    >
                  </div>
                </div>

                <div class="secure-notice">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <BaseButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  :disabled="isProcessingTier"
                >
                  <span v-if="isProcessingTier">Processing...</span>
                  <span v-else>Donate ${{ selectedTier?.amount }}/month</span>
                </BaseButton>
              </form>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.get-involved-page {
  overflow-x: hidden;
}

/* Hero */
.involvement-hero {
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
    rgba(13, 40, 24, 0.95) 0%,
    rgba(27, 67, 50, 0.85) 100%
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
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: var(--font-bold);
  color: var(--text-light);
  margin-bottom: var(--space-6);
}

.hero-description {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-10);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}

/* Donation Section */
.donation-section {
  background: var(--bg-secondary);
}

.donation-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-16);
}

@media (max-width: 1200px) {
  .donation-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .donation-grid {
    grid-template-columns: 1fr;
  }
}

.donation-card {
  position: relative;
  background: var(--bg-primary);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  border: 2px solid transparent;
}

.donation-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.donation-card--popular {
  border-color: var(--color-primary-500);
  background: linear-gradient(180deg, var(--color-primary-50) 0%, var(--bg-primary) 100%);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-1) var(--space-4);
  background: var(--gradient-nature);
  color: var(--text-light);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.tier-name {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.tier-amount {
  margin-bottom: var(--space-4);
}

.tier-amount .currency {
  font-size: var(--text-lg);
  color: var(--text-tertiary);
  vertical-align: top;
}

.tier-amount .amount {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
}

.tier-amount .period {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.tier-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-neutral-200);
}

.tier-features {
  margin-bottom: var(--space-8);
}

.tier-features li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
}

.tier-features svg {
  color: var(--color-primary-500);
  flex-shrink: 0;
}

/* One-time donation */
.one-time-donation {
  background: var(--bg-primary);
  padding: var(--space-10);
  border-radius: var(--radius-2xl);
  text-align: center;
  box-shadow: var(--shadow-card);
}

.one-time-donation h3 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-8);
}

.custom-amount {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.amount-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}

.amount-btn {
  padding: var(--space-3) var(--space-6);
  background: var(--bg-secondary);
  border: 2px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.amount-btn:hover {
  background: var(--color-primary-100);
  border-color: var(--color-primary-400);
  color: var(--color-primary-700);
}

.amount-btn.active {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: var(--text-light);
  box-shadow: 0 4px 12px rgba(45, 90, 39, 0.3);
  transform: scale(1.05);
}

.custom-input {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-1);
  padding-left: var(--space-4);
  transition: border-color var(--transition-fast);
}

.custom-input:focus-within {
  border-color: var(--color-primary-400);
}

.currency-symbol {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.6);
  font-weight: var(--font-medium);
}

.custom-input input {
  border: none;
  background: transparent;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-lg);
  color: var(--text-light);
  width: 100%;
  min-width: 180px;
  outline: none;
}

.custom-input input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-size: var(--text-base);
}

.custom-input input::-webkit-outer-spin-button,
.custom-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-input input[type=number] {
  -moz-appearance: textfield;
}

/* Volunteer Section */
.volunteer-section {
  background: var(--bg-dark);
  padding: var(--space-24) 0;
}

.volunteer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

@media (max-width: 1024px) {
  .volunteer-grid {
    grid-template-columns: 1fr;
  }
}

.volunteer-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-base);
}

.volunteer-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.card-header {
  margin-bottom: var(--space-4);
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-light);
  margin-bottom: var(--space-2);
}

.card-meta {
  display: flex;
  gap: var(--space-4);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-accent-gold);
}

.card-description {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.7);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.card-requirements {
  margin-bottom: var(--space-6);
}

.req-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: var(--space-2);
  display: block;
}

.card-requirements ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.card-requirements li {
  padding: var(--space-1) var(--space-3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.8);
}

.volunteer-cta {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.volunteer-cta p {
  color: rgba(255, 255, 255, 0.7);
}

/* Partner Section */
.partner-section {
  background: var(--bg-primary);
}

.partner-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

@media (max-width: 1024px) {
  .partner-grid {
    grid-template-columns: 1fr;
  }
}

.partner-content .section-subtitle {
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

.partner-content .section-title {
  margin-bottom: var(--space-6);
}

.partner-text {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}

.partnership-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

@media (max-width: 640px) {
  .partnership-types {
    grid-template-columns: 1fr;
  }
}

.type h4 {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.type p {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.partner-image {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.partner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Other Ways Section */
.other-ways {
  background: var(--bg-secondary);
}

.ways-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .ways-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .ways-grid {
    grid-template-columns: 1fr;
  }
}

.way-card {
  text-align: center;
  padding: var(--space-8);
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
}

.way-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
}

.way-icon {
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

.way-card:hover .way-icon {
  background: var(--gradient-nature);
  color: var(--text-light);
}

.way-card h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.way-card p {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* Donation Success */
.donation-success {
  text-align: center;
  padding: var(--space-8);
  animation: fadeIn 0.4s ease;
}

.donation-success .success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-6);
  background: var(--color-primary-50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-600);
}

.donation-success h4 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--color-primary-700);
  margin-bottom: var(--space-3);
}

.donation-success p {
  font-size: var(--text-base);
  color: var(--text-secondary);
}

.donation-error {
  color: #dc2626;
  font-size: var(--text-sm);
  margin-bottom: var(--space-4);
}

.amount-btn:disabled,
.custom-input input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: 9999;
}

.modal-content {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--space-8);
  position: relative;
}

.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.modal-header {
  margin-bottom: var(--space-6);
  padding-right: var(--space-10);
}

.modal-header h3 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.modal-header p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
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
.form-group textarea {
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--text-primary);
  background: var(--bg-primary);
  transition: all var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(45, 90, 39, 0.1);
}

.form-group input:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-success {
  text-align: center;
  padding: var(--space-8) var(--space-4);
}

.modal-success .success-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto var(--space-6);
  background: var(--color-primary-50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-600);
}

.modal-success h3 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.modal-success p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}

/* Donation Modal Specific Styles */
.donation-modal .tier-badge {
  display: inline-block;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-3);
}

.donation-modal .tier-price {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-2);
}

.donation-modal .tier-price span {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  color: var(--text-tertiary);
}

.donation-modal .tier-impact {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.secure-notice {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--color-primary-50);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--color-primary-700);
}

.secure-notice svg {
  flex-shrink: 0;
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

/* Mobile Responsive */
@media (max-width: 768px) {
  .involvement-hero {
    min-height: 60vh;
    padding-top: calc(var(--header-height-mobile) + var(--space-8));
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-description {
    font-size: var(--text-lg);
    margin-bottom: var(--space-8);
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    padding: 0 var(--space-4);
  }

  .donation-card {
    padding: var(--space-6);
  }

  .tier-amount .amount {
    font-size: var(--text-4xl);
  }

  .one-time-donation {
    padding: var(--space-6);
  }

  .one-time-donation h3 {
    font-size: var(--text-xl);
  }

  .amount-btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
  }

  .volunteer-section {
    padding: var(--space-16) 0;
  }

  .volunteer-card {
    padding: var(--space-6);
  }

  .card-meta {
    flex-direction: column;
    gap: var(--space-2);
  }

  .partnership-types {
    gap: var(--space-4);
  }

  .way-card {
    padding: var(--space-6);
  }

  .way-icon {
    width: 60px;
    height: 60px;
  }

  .modal-content {
    padding: var(--space-6);
    margin: var(--space-4);
    max-height: calc(100vh - var(--space-8));
  }

  .modal-header h3 {
    font-size: var(--text-xl);
  }
}

@media (max-width: 480px) {
  .involvement-hero {
    min-height: 55vh;
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

  .tier-name {
    font-size: var(--text-lg);
  }

  .tier-amount .amount {
    font-size: var(--text-3xl);
  }

  .amount-options {
    gap: var(--space-2);
  }

  .amount-btn {
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-xs);
  }

  .custom-input input {
    width: 100%;
    min-width: 140px;
  }

  .card-title {
    font-size: var(--text-lg);
  }

  .card-requirements li {
    font-size: 0.65rem;
  }
}
</style>
