<template>
  <h4 class="fw-semibold text-muted">
    <slot name="title"></slot>
  </h4>

  <div class="d-flex w-100 justify-content-end">
    <div class="d-flex flex-wrap justify-content-end gap-2 mb-3">
      <slot name="actions"></slot>
    </div>
  </div>

  <div class="d-flex w-100">
    <slot name="content"></slot>
  </div>

  <slot name="modals"></slot>
</template>

<script setup>

</script>

<style>

</style>