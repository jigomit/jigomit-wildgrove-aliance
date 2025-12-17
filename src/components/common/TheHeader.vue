<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const headerRef = ref(null)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Get Involved', path: '/get-involved' },
  { name: 'Contact', path: '/contact' }
]

const isActive = (path) => {
  return route.path === path
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header ref="headerRef" class="header" :class="{ 'header--scrolled': isScrolled, 'header--menu-open': isMobileMenuOpen }">
    <div class="container header__container">
      <!-- Logo -->
      <RouterLink to="/" class="header__logo" @click="closeMobileMenu">
        <svg viewBox="0 0 100 100" class="logo-icon">
          <defs>
            <linearGradient id="headerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#2D5A27" />
              <stop offset="100%" style="stop-color:#4A7C59" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#headerLogoGrad)"/>
          <path d="M50 20 C30 35 25 55 35 70 C40 60 45 50 50 45 C55 50 60 60 65 70 C75 55 70 35 50 20" fill="#E8F5E9"/>
          <path d="M50 30 L50 65" stroke="#2D5A27" stroke-width="2" fill="none"/>
        </svg>
        <span class="logo-text">
          <span class="logo-text__main">WildGrove</span>
          <span class="logo-text__sub">Alliance</span>
        </span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="header__nav">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.path" class="nav-item">
            <RouterLink
              :to="link.path"
              class="nav-link"
              :class="{ 'nav-link--active': isActive(link.path) }"
            >
              {{ link.name }}
              <span class="nav-link__underline"></span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- CTA Button -->
      <RouterLink to="/get-involved" class="header__cta btn btn--primary">
        Donate Now
      </RouterLink>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-menu-toggle"
        :class="{ 'is-active': isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span class="hamburger">
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
        </span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <nav class="mobile-menu__nav">
          <ul class="mobile-nav-list">
            <li v-for="(link, index) in navLinks" :key="link.path" class="mobile-nav-item"
                :style="{ '--delay': `${index * 0.1}s` }">
              <RouterLink
                :to="link.path"
                class="mobile-nav-link"
                :class="{ 'mobile-nav-link--active': isActive(link.path) }"
                @click="closeMobileMenu"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
          <RouterLink to="/get-involved" class="mobile-menu__cta btn btn--primary btn--large" @click="closeMobileMenu">
            Donate Now
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: var(--z-fixed);
  transition: all var(--transition-base);
  background: transparent;
}

.header--scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: var(--shadow-md);
}

.header--menu-open {
  background: var(--bg-dark);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  z-index: 10;
}

.logo-icon {
  width: 48px;
  height: 48px;
  transition: transform var(--transition-base);
}

.header__logo:hover .logo-icon {
  transform: scale(1.05);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-text__main {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-light);
  transition: color var(--transition-base);
}

.header--scrolled .logo-text__main {
  color: #1B4332;
}

.logo-text__sub {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-accent-gold);
  transition: color var(--transition-base);
}

.header--scrolled .logo-text__sub {
  color: #2D5A27;
}

/* Desktop Navigation */
.header__nav {
  display: none;
}

@media (min-width: 1024px) {
  .header__nav {
    display: block;
  }
}

.nav-list {
  display: flex;
  gap: var(--space-8);
}

.nav-link {
  position: relative;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-light);
  padding: var(--space-2) 0;
  transition: color var(--transition-fast);
}

.header--scrolled .nav-link {
  color: #1a1a1a;
}

.nav-link:hover,
.nav-link--active {
  color: var(--color-accent-gold);
}

.header--scrolled .nav-link:hover {
  color: #2D5A27;
}

.header--scrolled .nav-link--active {
  color: #1B4332;
  font-weight: var(--font-semibold);
}

.nav-link__underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-nature);
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}

.nav-link:hover .nav-link__underline,
.nav-link--active .nav-link__underline {
  width: 100%;
}

/* CTA Button */
.header__cta {
  display: none;
}

@media (min-width: 1024px) {
  .header__cta {
    display: inline-flex;
  }
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  cursor: pointer;
}

.btn--primary {
  background: var(--gradient-nature);
  color: var(--text-light);
  box-shadow: 0 4px 15px rgba(45, 90, 39, 0.3);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 90, 39, 0.4);
  color: var(--text-light);
}

.btn--large {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  z-index: 10;
}

@media (min-width: 1024px) {
  .mobile-menu-toggle {
    display: none;
  }
}

.hamburger {
  position: relative;
  width: 24px;
  height: 18px;
}

.hamburger__line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--text-light);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.header--scrolled .hamburger__line {
  background: #1B4332;
}

.hamburger__line:nth-child(1) {
  top: 0;
}

.hamburger__line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger__line:nth-child(3) {
  bottom: 0;
}

.mobile-menu-toggle.is-active .hamburger__line {
  background: var(--text-light);
}

.mobile-menu-toggle.is-active .hamburger__line:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.mobile-menu-toggle.is-active .hamburger__line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.is-active .hamburger__line:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: var(--header-height-mobile);
  left: 0;
  width: 100%;
  height: calc(100vh - var(--header-height-mobile));
  height: calc(100dvh - var(--header-height-mobile));
  background: var(--bg-dark);
  padding: var(--space-8) var(--space-6);
  padding-bottom: calc(var(--space-8) + env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 100;
}

@media (min-width: 769px) and (max-width: 1023px) {
  .mobile-menu {
    top: var(--header-height);
    height: calc(100vh - var(--header-height));
    height: calc(100dvh - var(--header-height));
  }
}

.mobile-menu__nav {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
}

.mobile-nav-list {
  flex: 1;
  margin-bottom: var(--space-6);
}

.mobile-nav-item {
  opacity: 0;
  animation: slideIn 0.4s ease forwards;
  animation-delay: var(--delay);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-nav-link {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--text-light);
  padding: var(--space-4) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link--active {
  color: var(--color-accent-gold);
  padding-left: var(--space-4);
}

.mobile-menu__cta {
  margin-top: auto;
  width: 100%;
  text-align: center;
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    height: var(--header-height-mobile);
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  .logo-text__main {
    font-size: var(--text-lg);
  }
}

/* Tablet specific adjustments */
@media (min-width: 769px) and (max-width: 1023px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .header__nav,
  .header__cta {
    display: none;
  }

  .mobile-nav-link {
    font-size: var(--text-3xl);
    padding: var(--space-5) 0;
  }

  .mobile-menu {
    padding: var(--space-10) var(--space-8);
  }
}

/* Very small screens */
@media (max-width: 375px) {
  .logo-text__main {
    font-size: var(--text-base);
  }

  .logo-text__sub {
    font-size: 0.65rem;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .mobile-nav-link {
    font-size: var(--text-xl);
    padding: var(--space-3) 0;
  }
}
</style>
