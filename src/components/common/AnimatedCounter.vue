<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  suffix: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 2
  },
  decimals: {
    type: Number,
    default: 0
  }
})

const counterRef = ref(null)
const displayValue = ref(0)
let gsapInstance = null

const animateCounter = async () => {
  if (!gsapInstance) {
    gsapInstance = (await import('gsap')).default
  }
  gsapInstance.to(displayValue, {
    value: props.value,
    duration: props.duration,
    ease: 'power2.out',
    onUpdate: () => {
      displayValue.value = Number(displayValue.value.toFixed(props.decimals))
    }
  })
}

onMounted(() => {
  const el = counterRef.value
  if (!el) return

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect()
      await animateCounter()
    }
  }, { rootMargin: '50px' })

  observer.observe(el)
})

watch(() => props.value, () => {
  if (gsapInstance) animateCounter()
})

const formattedValue = () => {
  return displayValue.value.toLocaleString()
}
</script>

<template>
  <span ref="counterRef" class="animated-counter">
    {{ prefix }}{{ formattedValue() }}{{ suffix }}
  </span>
</template>

<style scoped>
.animated-counter {
  font-variant-numeric: tabular-nums;
}
</style>
