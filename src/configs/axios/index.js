import { computed } from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'
import { useToasterStore } from '@/store/toasterStore'

export default (() => {
  const toasterStore = computed(() => useToasterStore())
  const domain = import.meta.env.VITE_API_URL
  const baseUrl = `https://${domain}`
  let instance

  function Axios() {
    if (instance) {
      return instance
    }

    instance = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        domain: window.location.host.split(':')[0],
      },
    })

    instance.interceptors.request.use(function(config) {
      NProgress.start()

      return config
    }, null)

    instance.interceptors.response.use(function(response) {
      const isSuccessStatus = response.status === 201 || response.status === 200
      const isMethodDiffGet = response.config.method !== 'get'
      const isSuccessStatusWithMessage = response.data?.message

      if (isMethodDiffGet && isSuccessStatus && isSuccessStatusWithMessage) {
        toasterStore.value.showToaster = true
        toasterStore.value.setTypeToaster('success')
        toasterStore.value.setMessage(response.data.message)
      }

      NProgress.done()

      return {
        status: response.status,
        data: response.data?.data || response.data,
        links: response.data?.links,
        meta: response.data?.meta,
      }
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
    })

    return instance
  }

  return instance || new Axios
})()