<template>
  <div id="searchModal" class="modal fade" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-semibold text-muted">
            Pesquisar
          </h5>

          <button type="button" class="btn-close" @click="emit('close')" aria-label="Close"></button>
        </div>

        <div class="modal-body d-flex justify-content-center">
          <div class="card w-75">
            <div class="card-body">
              <slot name="content"></slot>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary fw-semibold" @click="emit('onSearch')">
            <fa :icon="['fa', 'fa-magnifying-glass']" :size="'sm'"/>
            Pesquisar
          </button>

          <button type="button" class="btn btn-secondary bg-gradient fw-semibold" @click="emit('close')">Fechar</button>
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

const emit = defineEmits(['onSearch', 'close'])

onMounted(() => {
  searchModal.value = new bootstrap.Modal('#searchModal', {})
})

watch(() => props.show, (value) => {
  const show = value

  if (show) {
    return searchModal.value.show()
  }

  searchModal.value.hide()
})

const { searchModal } = {
  searchModal: ref()
}
</script>

<style></style>