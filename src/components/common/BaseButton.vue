<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'outline', 'ghost', 'light'].includes(val)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (val) => ['small', 'medium', 'large'].includes(val)
  },
  to: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const componentType = computed(() => {
  if (props.to) return 'RouterLink'
  if (props.href) return 'a'
  return 'button'
})

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--loading': props.loading,
    'base-button--disabled': props.disabled,
    'base-button--full-width': props.fullWidth,
    'base-button--icon': props.icon
  }
])

const handleClick = (e) => {
  if (!props.disabled && !props.loading) {
    emit('click', e)
  }
}
</script>

<template>
  <component
    :is="componentType"
    :to="to"
    :href="to || href"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="button-loader">
      <svg class="spinner" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"/>
      </svg>
    </span>
    <span class="button-content" :class="{ 'is-loading': loading }">
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    </span>
    <span class="button-shine"></span>
  </component>
</template>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-base);
  overflow: hidden;
  text-decoration: none;
  border: 2px solid transparent;
}

/* Sizes */
.base-button--small {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.base-button--medium {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}

.base-button--large {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}

/* Icon button */
.base-button--icon.base-button--small {
  padding: var(--space-2);
}

.base-button--icon.base-button--medium {
  padding: var(--space-3);
}

.base-button--icon.base-button--large {
  padding: var(--space-4);
}

/* Variants */
.base-button--primary {
  background: var(--gradient-nature);
  color: var(--text-light);
  box-shadow: 0 4px 15px rgba(45, 90, 39, 0.3);
}

.base-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 90, 39, 0.4);
}

.base-button--secondary {
  background: var(--color-secondary-600);
  color: var(--text-light);
  box-shadow: 0 4px 15px rgba(93, 64, 55, 0.3);
}

.base-button--secondary:hover {
  background: var(--color-secondary-700);
  transform: translateY(-2px);
}

.base-button--outline {
  background: transparent;
  border-color: var(--color-primary-500);
  color: var(--color-primary-600);
}

.base-button--outline:hover {
  background: var(--color-primary-500);
  color: var(--text-light);
}

.base-button--ghost {
  background: transparent;
  color: var(--color-primary-600);
}

.base-button--ghost:hover {
  background: var(--color-primary-50);
}

.base-button--light {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-light);
  backdrop-filter: blur(10px);
  border-color: rgba(255, 255, 255, 0.3);
}

.base-button--light:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Full Width */
.base-button--full-width {
  width: 100%;
}

/* Disabled State */
.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading State */
.base-button--loading {
  cursor: wait;
}

.button-loader {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.button-content {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  transition: opacity var(--transition-fast);
}

.button-content.is-loading {
  opacity: 0;
}

/* Shine Effect */
.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.base-button:hover .button-shine {
  left: 100%;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Active State */
.base-button:active {
  transform: translateY(0) scale(0.98);
}
</style>
