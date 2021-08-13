<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'CCES-Client',
  meta: [
    { name: 'description', content: 'CP Chinese Clinic Liff Client Endpoint' }
  ]
})
</script>

<template>
  <router-view v-slot='{ Component }'>
    <component :is='Component' />
  </router-view>
</template>