<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: t('title'),
  meta: [
    { name: 'description', content: t('description') },
  ],
})
</script>

<template>
  <router-view />
</template>
