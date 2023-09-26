<template>
  <div v-if="mask === 'cpf'" class="form-floating">
    <input
      data-js="mask"
      :id="name"
      :type="type"
      :class="[!$empty(error?.[name]) ? 'is-invalid' : '', 'form-control']"
      :value="modelValue"
      v-cleave="computedOpt.getCPFMaskOptions"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder=" ">

    <label for="{{ name }}" class="form-label">{{ label }}</label>

    <span v-if="!$empty(error?.[name])" class="invalid-feedback m-0 fs-13 fw-semibold">
      {{ error[name][0] }}
    </span>
  </div>

  <div v-else class="form-floating">
    <input
      :disabled="disabled"
      :id="name"
      :type="type"
      :class="[!$empty(error?.[name]) ? 'is-invalid' : '', 'form-control']"
      :value="modelValue"
      @blur.prevent="$emit('update:modelValue', $event.target.value.trim())"
      @input.prevent="$emit('update:modelValue', $trimInput($event))"
      placeholder=" ">

    <label for="{{ name }}" class="form-label">{{ label }}</label>

    <span v-if="!$empty(error?.[name])" class="invalid-feedback m-0 fs-13 fw-semibold">
      {{ error[name][0] }}
    </span>
  </div>
</template>

<script setup>
/* config */
import { inject, computed } from 'vue'

/* helper */
const $empty = inject('$empty')
const $trimInput = inject('$trimInput')

/* props */
defineProps({
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'text'
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    required: true
  },
  mask: {
    type: String,
    default: null
  },
  error: {
    type: Object,
    default: null
  }
})

// computed
const computedOpt = computed(() => {
  function getCPFMaskOptions() {
    return { numericOnly: true, delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2] }
  }

  return {
    getCPFMaskOptions: getCPFMaskOptions()
  }
})
</script>

<style></style>