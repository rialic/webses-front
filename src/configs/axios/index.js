import { computed } from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'
import { useToasterStore } from '@/store/toasterStore'

const toasterStore = computed(() => useToasterStore())
const domain = import.meta.env.VITE_API_URL
const baseUrl = `https://${domain}`

axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-type'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['domain'] = window.location.host.split(':')[0]

axios.interceptors.request.use(function(config) {
  NProgress.start()

  return config
}, function(error) {
  return error
})

axios.interceptors.response.use(
  function(response) {
    const isSuccessStatus = response.status === 201 || response.status === 200
    const isMethodDiffGet = response.config.method !== 'get'
    const isSuccessStatusWithMessage = response.data?.message

    if (isMethodDiffGet && isSuccessStatus && isSuccessStatusWithMessage) {
      toasterStore.value.showToaster = true
      toasterStore.value.setTypeToaster('success')
      toasterStore.value.setMessage(response.data.message)
    }

    NProgress.done()

    if (!response.data?.data) {
      return { data: response.data?.data , status: response.status }
    }

    return { data: Array.isArray(response.data?.data) ? [...response.data.data] : response.data.data , status: response.status }
  },
  function({ response, message }) {
    if (response.status === 422 || response.status === 400) {
      toasterStore.value.setMessage('Erros foram encontrados.')
      toasterStore.value.setErrorMessage('')
      toasterStore.value.showToaster = true
    }

    if (response.status === 500) {
      toasterStore.value.setMessage('Algum erro ocorreu no servidor.')
      toasterStore.value.setErrorMessage(response.data?.message)
      toasterStore.value.showToaster = true

      NProgress.done()

      return
    }

    NProgress.done()
    return { ...response.data, status: response.status, message }
  }
)

export default axios