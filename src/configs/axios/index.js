import axios from 'axios'

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

export default axios