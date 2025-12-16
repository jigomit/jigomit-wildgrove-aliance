import { onUnmounted } from 'vue'

let gsapInstance = null
let ScrollTriggerInstance = null

async function loadGsap() {
  if (!gsapInstance) {
    gsapInstance = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsapInstance.registerPlugin(ScrollTrigger)
    ScrollTriggerInstance = ScrollTrigger
  }
  return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance }
}

export function useScrollAnimation() {
  const fadeInUp = async (element, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }

    const config = { ...defaults, ...options }

    gsap.fromTo(element,
      { opacity: 0, y: config.y },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
          trigger: element,
          start: config.start,
          toggleActions: config.toggleActions
        }
      }
    )
  }

  const fadeIn = async (element, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }

    const config = { ...defaults, ...options }

    gsap.fromTo(element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
          trigger: element,
          start: config.start,
          toggleActions: config.toggleActions
        }
      }
    )
  }

  const slideInLeft = async (element, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }

    const config = { ...defaults, ...options }

    gsap.fromTo(element,
      { opacity: 0, x: config.x },
      {
        opacity: 1,
        x: 0,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
          trigger: element,
          start: config.start,
          toggleActions: config.toggleActions
        }
      }
    )
  }

  const slideInRight = async (element, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }

    const config = { ...defaults, ...options }

    gsap.fromTo(element,
      { opacity: 0, x: config.x },
      {
        opacity: 1,
        x: 0,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
          trigger: element,
          start: config.start,
          toggleActions: config.toggleActions
        }
      }
    )
  }

  const scaleIn = async (element, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }

    const config = { ...defaults, ...options }

    gsap.fromTo(element,
      { opacity: 0, scale: config.scale },
      {
        opacity: 1,
        scale: 1,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
          trigger: element,
          start: config.start,
          toggleActions: config.toggleActions
        }
      }
    )
  }

  const staggerFadeInUp = async (elements, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }

    const config = { ...defaults, ...options }

    gsap.fromTo(elements,
      { opacity: 0, y: config.y },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease,
        scrollTrigger: {
          trigger: elements[0],
          start: config.start,
          toggleActions: config.toggleActions
        }
      }
    )
  }

  const parallax = async (element, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      yPercent: 20,
      ease: 'none',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }

    const config = { ...defaults, ...options }

    gsap.to(element, {
      yPercent: config.yPercent,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: config.start,
        end: config.end,
        scrub: config.scrub
      }
    })
  }

  const floatingAnimation = async (element, options = {}) => {
    const { gsap } = await loadGsap()
    const defaults = {
      y: -20,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    }

    const config = { ...defaults, ...options }

    gsap.to(element, {
      y: config.y,
      duration: config.duration,
      ease: config.ease,
      yoyo: config.yoyo,
      repeat: config.repeat
    })
  }

  onUnmounted(() => {
    if (ScrollTriggerInstance) {
      ScrollTriggerInstance.getAll().forEach(trigger => trigger.kill())
    }
  })

  return {
    fadeInUp,
    fadeIn,
    slideInLeft,
    slideInRight,
    scaleIn,
    staggerFadeInUp,
    parallax,
    floatingAnimation
  }
}
