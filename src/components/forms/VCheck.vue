<template>
  <div class="form-check">
    <input v-if="checked"
      :id="`check_${name}`"
      type="checkbox"
      checked
      :name="`check_${name}`"
      :class="[!$empty(errors?.[name]) ? 'is-invalid' : '', 'form-check-input']"
      :value="value"
      @change="$emit('update:modelValue', !$empty(value) ? onChangeCheckBox($event.target.checked) : $event.target.checked)">

    <input v-else
      :id="`check_${name}`"
      type="checkbox"
      :name="`check_${name}`"
      :class="[!$empty(errors?.[name]) ? 'is-invalid' : '', 'form-check-input']"
      :value="value"
      @change="$emit('update:modelValue', !$empty(value) ? onChangeCheckBox($event.target.checked) :  $event.target.checked)">

    <label class="form-check-label" :for="`check_${name}`">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
// config
import { onMounted, inject } from 'vue'

onMounted(() => {
  if (props.checked && !$empty(props.value)) {
    emit('update:modelValue', props.value)
  }
})

// helper
const $empty = inject('$empty')

// props emits
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: true
  },
  value: {
    type: String,
    default: null
  },
  modelValue: {
    required: true,
  },
  errors: {
    type: Object,
    default: () => {}
  }
})

function onChangeCheckBox(event) {
  const modelValue = props.modelValue

  if ($empty(event)) {
    return modelValue.filter(val => val !== props.value)
  }

  modelValue.push(props.value)

  return modelValue
}
</script>

<style></style>