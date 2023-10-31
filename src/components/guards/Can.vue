<template>
  <template v-if="canPass">
    <slot></slot>
  </template>
</template>

<script setup>
import { user } from '@/auth'
import { inject, computed } from 'vue'

/* helper */
const $empty = inject('$empty')

const props = defineProps({
  pass: {
    type: [String, Array],
    required: true,
    default: null
  }
})

const canPass = computed(() => {
  if (!$empty(props.pass)) {
    return !! user.value.abilities.find((ability) => props.pass.includes(ability))
  }

  return false
})

</script>

<style>

</style>