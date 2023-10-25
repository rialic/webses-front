/* App */
import { app } from '@/configs/app'

/* Assets */
import '@/assets/scss/app.scss'
import 'vue-select/dist/vue-select.css'
import * as bootstrap from 'bootstrap'

/* Vue Plugins */
import router from '@/router'
import { createPinia } from 'pinia'
import Cleave from 'cleave.js'
import Vue3Autocounter from 'vue3-autocounter'

/* Helpers */
import { logo, getSubDomain, empty, parseFilters, trimInput, lowerCaseName, validCPF } from '@/helper'

/* Components */
import FontAwesomeIcon from '@/fontawesome'
import VToaster from '@/components/notifications/VToaster.vue'
import VInput from '@/components/forms/VInput.vue'
import VCheck from '@/components/forms/VCheck.vue'
import VSelect from '@/components/forms/VSelect.vue'

/* Custom components */
app.component('fa', FontAwesomeIcon)
app.component('v-toaster', VToaster)
app.component('v-input', VInput)
app.component('v-check', VCheck)
app.component('v-select', VSelect)
app.component('v-autocounter', Vue3Autocounter)

app.provide('$logo', logo())
app.provide('$empty', empty)
app.provide('$getSubDomain', getSubDomain)
app.provide('$parseFilters', parseFilters)
app.provide('$trimInput', trimInput)
app.provide('$lowerCaseName', lowerCaseName)
app.provide('$validCPF', validCPF)

/* Custom directives */
app.directive('cleave', (el, binding) => {
  const isMaskInput = el.dataset.js === 'mask'

  if (isMaskInput) {
    el.cleave = new Cleave(el, binding.value || {})
  }
})

app.use(router).use(createPinia()).mount('#app')