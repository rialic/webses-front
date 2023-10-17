<template>
  <div class="toast-container p-3 top-0 end-0">
    <div class="toast border border-1 shadow" :class="{'show' : toastStore.showToaster}">
      <div class="toast-header border-0">
        <span class="d-flex align-items-center column-gap-1 me-auto fw-semibold" :class="`text-${getToaster.color}`">
          <fa class="fa-lg" :icon="getToaster.icon" /> {{ getToaster.headerMessage }}
        </span>

        <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="toast"></button>
      </div>

      <div class="d-flex flex-column toast-body text-white fw-semibold border-0 rounded-bottom" :class="`bg-${getToaster.color}`">
        <span>{{ toastStore.getMessage }}</span>

        <span>{{ toastStore.getErrorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/* configs */
import { computed, onUpdated } from 'vue'

/* store */
import { useToasterStore } from '@/store/toasterStore'

const toastStore = useToasterStore()

onUpdated(() => {
  setTimeout(() => {
    toastStore.showToaster = false
  }, 15000)
})

/* computed */
const getToaster = computed(() => {
  const headerMessage = { 'info': 'Info', 'success': 'Sucesso', 'error': 'Ops...' }
  const colorNotification = { 'info': 'info', 'success': 'success', 'error': 'danger' }
  const iconNotification = { 'info': ['fas', 'circle-info'], 'success': ['far', 'circle-check'], 'error': ['far', 'circle-xmark'] }

  return {
    headerMessage: headerMessage[toastStore.getTypeToaster],
    color: colorNotification[toastStore.getTypeToaster],
    icon: iconNotification[toastStore.getTypeToaster]
  }
})
</script>

<style></style>