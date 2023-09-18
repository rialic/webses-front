<template>
  <div v-if="mask === 'cpf'" class="form-floating">
    <input
      data-js="mask"
      :id="name"
      :type="type"
      :class="[!$empty(errors?.[name]) ? 'is-invalid' : '', 'form-control']"
      :value="modelValue"
      v-cleave="computedOpt.getCPFMaskOptions"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder=" ">

    <label for="{{ name }}" class="form-label">{{ label }}</label>

    <span v-if="!$empty(errors?.[name])" class="fs-13 fw-semibold text-danger">
      {{ errors[name][0] }}
    </span>
  </div>

  <div v-else class="form-floating">
    <input
      :id="name"
      :type="type"
      :class="[!$empty(errors?.[name]) ? 'is-invalid' : '', 'form-control']"
      :value="modelValue"
      @blur.prevent="$emit('update:modelValue', $event.target.value.trim())"
      @input.prevent="$emit('update:modelValue', $trimInput($event))"
      placeholder=" ">

    <label for="{{ name }}" class="form-label">{{ label }}</label>

    <span v-if="!$empty(errors?.[name])" class="fs-13 fw-semibold text-danger">
      {{ errors[name][0] }}
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
  errors: {
    type: Object,
    default: () => {}
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