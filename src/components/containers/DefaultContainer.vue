<template>
  <h4 class="fw-semibold text-muted">
    <slot name="title"></slot>
  </h4>

  <div class="d-flex w-100">
    <div class="d-flex flex-wrap w-100 gap-2 mb-3">
      <div class="d-flex flex-wrap flex-fill gap-2">
        <slot name="actions"></slot>
      </div>

      <div class="d-flex column-gap-2">
        <slot name="addons"></slot>
      </div>
    </div>
  </div>

  <div class="d-flex w-100">
    <div class="w-100">
      <slot name="content">
        <div class="mt-4">
        </div>
      </slot>
    </div>
  </div>

  <slot name="modals"></slot>
</template>

<script setup>

</script>

<style></style>