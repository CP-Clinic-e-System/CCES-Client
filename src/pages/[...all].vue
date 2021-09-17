<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineExpose({
  t,
})
</script>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
