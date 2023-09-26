import axios from 'axios'
import NProgress from 'nprogress'

const domain = import.meta.env.VITE_API_URL
const baseUrl = `https://${domain}`
const websesToken = localStorage.getItem('webses_token')

axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-type'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common.Authorization = `Bearer ${websesToken}`
axios.defaults.headers.common['Subdomain'] = window.location.host.split(':')[0]

axios.interceptors.request.use(function(config) {
  NProgress.start()

  return config
}, function(error) {
  return error
})

axios.interceptors.response.use(
  function(response) {
    NProgress.done()

    return { ...response.data, status: response.status }
  },
  function({ response, message }) {
    NProgress.done()
    return { ...response.data, status: response.status, message }
  }
)

export default axios