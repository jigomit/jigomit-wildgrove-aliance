<script setup>
import { useRoute } from 'vue-router'
import TheHeader from './components/common/TheHeader.vue'
import TheFooter from './components/common/TheFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="app-wrapper">
    <TheHeader />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="route.path" />
      </RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  contain: layout;
}

.main-content {
  flex: 1;
  padding-top: var(--header-height);
  min-height: calc(100vh - 80px);
  contain: layout style;
}

@media (max-width: 768px) {
  .main-content {
    padding-top: var(--header-height-mobile);
    min-height: calc(100vh - 64px);
  }
}
</style>
