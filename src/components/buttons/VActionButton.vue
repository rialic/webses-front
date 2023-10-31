<template>
  <button type="button" class="btn btn-outline-blue opacity-75 fw-semibold" @click="goToNavigation" style="min-width: 9.375rem;">
    <slot></slot>
  </button>
</template>

<script setup>
/* configs */
import { useRouter } from 'vue-router'

const router = useRouter()

/* props */
const props = defineProps({
  routerName: {
    type: String,
    required: true
  }
})

/* methods */
function goToNavigation() {
  router.push({ name: props.routerName })
}

</script>

<style></style>