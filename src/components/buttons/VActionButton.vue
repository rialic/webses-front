<template>
  <button v-if="routerName" :type="type" class="btn btn-action fw-semibold" :class="`btn-${(btnOutline) ? 'outline' : ''}-${color}`" @click="goToNavigation">
    <slot></slot>
  </button>

  <button v-else :type="type" class="btn btn-action fw-semibold" :class="`btn${(btnOutline) ? '-outline' : ''}-${color}`">
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
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  btnOutline: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'primary'
  }
})

/* methods */
function goToNavigation() {
  router.push({ name: props.routerName })
}

</script>

<style></style>