import { reactive, computed, ref } from 'vue'
import axios from '@/configs/axios'

export const {
  login,
  logout,
  attempt,
  errors,
  authenticated,
  user
} = (() => {
  const errors = ref({})
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

  async function login(form) {
    await axios.get('sanctum/csrf-cookie')

    try {
      const response = await axios.post('login', form)

      if (response.status === 200) {
        localStorage.setItem('webses_token', response.data.token)
      }

      attempt()
    } catch (exception) {
      if (exception.response.status === 422) {
        errors.value = exception.response.data.errors
      }
    }
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
    login,
    logout,
    attempt,
    errors,
    authenticated: getAuthenticated(),
    user: getUser()
  }
})()