import { reactive, computed } from 'vue'
import axios from '@/configs/axios'


export const {
  register,
  login,
  logout,
  attempt,
  authenticated,
  user
} = (() => {
  const state = reactive({
    authenticated: false,
    user: {}
  })

  function getAuthenticated() {
    return computed(() => state.authenticated)
  }

  function getUser() {
    return computed(() => state.user)
  }

  function setAuthenticated(authenticated) {
    state.authenticated = authenticated
  }

  function setUser(user) {
    state.user = user
  }

  async function attempt() {
    try {
      const response = await axios.get('api/me')

      if (response.status === 200) {
        setAuthenticated(true)
        setUser(response.data.data)
      }

      return response
    } catch (exception) {
      setAuthenticated(false)
      setUser({})
    }
  }

  async function login(data) {
    await axios.get('sanctum/csrf-cookie')
    const response = await axios.post('login', data)

    if (response.status === 200) {
      localStorage.setItem('webses_token', response.data.token)
    }

    attempt()

    if (response.status === 422) {
      return response
    }
  }

  async function register(data) {
    const form = { ...data, cpf: data.cpf.replaceAll('.', '').replace('-', ''), device_name: navigator.userAgent }
    return await axios.post('register', form)
  }

  async function logout() {
    try {
      const response = await axios.post('logout')

      if (response.status === 200) {
        setAuthenticated(false)
        setUser({})
      }
    } catch (exception) {
      //
    }
  }

  return {
    register,
    login,
    logout,
    attempt,
    authenticated: getAuthenticated(),
    user: getUser()
  }
})()