import { reactive, computed } from 'vue'
import axios from '@/configs/axios'

export const {
  register,
  login,
  logout,
  attempt,
  authenticated,
  verified,
  user
} = (() => {
  const state = reactive({
    authenticated: false,
    verified: false,
    user: {}
  })

  function getAuthenticated() {
    return computed(() => state.authenticated)
  }

  function getVerified() {
    return computed(() => state.verified)
  }

  function getUser() {
    return computed(() => state.user)
  }

  function setAuthenticated(authenticated) {
    state.authenticated = authenticated
  }

  function setVerified(verified) {
    state.verified = verified
  }

  function setUser(user) {
    state.user = user
  }

  async function attempt() {
    try {
      const response = await axios.get('api/me')

      if (response.status === 403) {
        const user = response?.user

        if (user && !user?.verified_at) {
          setVerified(false)
          setUser(user)
        }
      }

      if (response.status === 200) {
        const user = response.data

        setAuthenticated(true)
        setVerified(true)
        setUser(user)
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
      const user = response.data

      setAuthenticated(true)
      setVerified(Boolean(user.verified_at))
    }

    return response
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
    verified: getVerified(),
    user: getUser()
  }
})()