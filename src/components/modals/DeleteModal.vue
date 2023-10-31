<template>
  <div id="deleteModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-semibold text-muted">
            <slot name="title"></slot>
          </h5>

          <button type="button" class="btn-close" @click="emit('close')" aria-label="Close"></button>
        </div>

        <div class="modal-body text-body-secondary text-center">
          <h5 class="fs-18">
            <slot name="content"></slot>
          </h5>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger fw-semibold" @click="emit('onDelete')">Excluir</button>
          <button type="button" class="btn btn-secondary fw-semibold" @click="emit('close')">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue'

/* helpers */
const bootstrap = inject('bootstrap')

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onDelete', 'close'])

onMounted(() => {
  deleteModal.value = new bootstrap.Modal('#deleteModal', {})
})

watch(() => props.show, (value) => {
  const show = value

  if (show) {
    return deleteModal.value.show()
  }

  deleteModal.value.hide()
})

const {
  deleteModal,
} = (() => {
  return {
    deleteModal: ref()
  }
})()
</script>

<style></style>