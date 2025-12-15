<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

const animateCounter = () => {
  gsap.to(displayValue, {
    value: props.value,
    duration: props.duration,
    ease: 'power2.out',
    onUpdate: () => {
      displayValue.value = Number(displayValue.value.toFixed(props.decimals))
    }
  })
}

onMounted(() => {
  ScrollTrigger.create({
    trigger: counterRef.value,
    start: 'top 80%',
    onEnter: animateCounter,
    once: true
  })
})

watch(() => props.value, () => {
  animateCounter()
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
