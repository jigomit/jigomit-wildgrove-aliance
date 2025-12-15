import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'WildGrove Alliance - Wildlife Conservation NGO',
      description: 'Join WildGrove Alliance in protecting wildlife and preserving natural habitats for future generations.'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
    meta: {
      title: 'About Us - WildGrove Alliance',
      description: 'Learn about our mission, vision, and the dedicated team behind WildGrove Alliance.'
    }
  },
  {
    path: '/programs',
    name: 'Programs',
    component: () => import('../views/ProgramsPage.vue'),
    meta: {
      title: 'Our Programs - WildGrove Alliance',
      description: 'Discover our wildlife conservation programs and projects protecting endangered species worldwide.'
    }
  },
  {
    path: '/get-involved',
    name: 'GetInvolved',
    component: () => import('../views/GetInvolvedPage.vue'),
    meta: {
      title: 'Get Involved - WildGrove Alliance',
      description: 'Volunteer, donate, or partner with us to make a difference in wildlife conservation.'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue'),
    meta: {
      title: 'Contact Us - WildGrove Alliance',
      description: 'Get in touch with WildGrove Alliance. We would love to hear from you.'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/BlogPage.vue'),
    meta: {
      title: 'Blog - WildGrove Alliance | Wildlife Conservation NGO',
      description: 'Read the latest articles on wildlife conservation, endangered species protection, habitat restoration, and environmental sustainability from WildGrove Alliance.',
      keywords: 'wildlife conservation blog, endangered species articles, habitat restoration, conservation news, wildlife protection'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogDetail',
    component: () => import('../views/BlogDetailPage.vue'),
    meta: {
      title: 'Blog - WildGrove Alliance',
      description: 'Wildlife conservation insights and stories from WildGrove Alliance.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'WildGrove Alliance'

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }

  next()
})

// Prefetch other routes after initial load for faster navigation
if (typeof window !== 'undefined') {
  router.isReady().then(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import('../views/AboutPage.vue')
        import('../views/ProgramsPage.vue')
        import('../views/GetInvolvedPage.vue')
      })
    }
  })
}

export default router
