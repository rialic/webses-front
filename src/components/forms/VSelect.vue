<template>
  <div class="form-floating">
    <vselect
      :name="name"
      :label="listLabel"
      placeholder=" "
      class="form-vselect"
      :value="props.selectedVal"
      :reduce="list => list.uuid"
      :options="list"
      v-model="selected">
    </vselect>

    <label class="form-label">{{ label }}</label>
  </div>
</template>

<script setup>
import { h, ref, watch } from 'vue'
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