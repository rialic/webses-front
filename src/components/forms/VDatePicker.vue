<template>
  <div class="form-floating">
    <vue-date-picker
     :name="name"
     :disabled="disabled"
     :placeholder="label"
     locale="pt-br"
     :format="'dd/MM/yyyy HH:mm'"
     model-type="yyyy-MM-dd HH:mm"
     month-name-format="long"
     v-model="date"
     input-class-name="form-vdatepicker"
     :state="!$empty(error?.[name]) ? false : null"
     menu-class-name="shadow-sm"
     :enable-time-picker="enableTimePicker"
     select-text="Selecionar"
     cancel-text="Fechar"
     hide-offset-dates>
    </vue-date-picker>

    <label v-if="date" class="form-label form-label-datepicker">{{ props.label }}</label>

    <span v-if="!$empty(error?.[name])" class="d-block invalid-feedback m-0 fs-13 fw-semibold">
      {{ error[name][0] }}
    </span>
  </div>
</template>

<script setup>
/* configs */
import { ref, watch, inject } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'

/* helpers */
const $empty = inject('$empty')

/* emits */
const emit = defineEmits(['update:modelValue'])

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
  label: {
    type: String,
    default: 'text'
  },
  selectedDate: {
    type: String,
    default: null
  },
  enableTimePicker: {
    type: Boolean,
    default: true
  },
  modelValue: {
    required: true
  },
  error: {
    type: Object,
    default: null
  }
})

/* datas */
const date = ref(null)

watch(() => props.selectedDate, () => {
  date.value = props.selectedDate
})

watch(date, (newDate) => {
  return emit('update:modelValue', newDate)
})

</script>

<style></style>