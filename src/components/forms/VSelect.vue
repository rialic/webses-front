<template>
  <div class="form-floating">
    <vselect
      :name="name"
      :disabled="disabled"
      :label="listLabel"
      placeholder=" "
      :class="[!$empty(error?.[name]) ? 'is-invalid' : '', 'form-vselect', {'vs--selected' : selected}]"
      :value="props.selectedVal"
      :reduce="list => list?.uuid || list.code"
      :options="list"
      v-model="selected">

      <template #no-options>Nenhum resultado encontrado.</template>
    </vselect>

    <span v-if="!$empty(error?.[name])" class="invalid-feedback m-0 fs-13 fw-semibold">
      {{ error[name][0] }}
    </span>

    <label class="form-label">{{ label }}</label>
  </div>
</template>

<script setup>
import { h, ref, watch, inject } from 'vue'
import vselect from 'vue-select'

/* Addons */
vselect.props.components.default = () => ({
  OpenIndicator: {
    render: () => h('span', {
      class: {
        'vs__dropdown-icon': true
      }
    }),
  }
})

/* helper */
const $empty = inject('$empty')

/* datas */
const selected = ref()

/* emits */
const emit = defineEmits(['update:modelValue', 'onResetDone'])

/* props */
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false
  },
  selectedVal: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'text'
  },
  listLabel: {
    type: String,
    required: true
  },
  list: {
    type: Array,
    required: true
  },
  reset: {
    type: Boolean,
    default: false
  },
  modelValue: {
    required: true
  },
  error: {
    type: Object,
    default: () => {}
  }
})

/* watch */
watch(() => props.selectedVal, () => {
  selected.value = props.selectedVal
})

watch(() => props.reset, () => {
  if (props.reset) {
    selected.value = null

    return emit('onResetDone', false)
  }
})

watch(selected, (newSelected) => {
  return emit('update:modelValue', newSelected)
})
</script>

<style></style>