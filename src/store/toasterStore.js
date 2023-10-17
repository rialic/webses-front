import { defineStore } from 'pinia'

export const useToasterStore = defineStore('toasterStore', {
  state: () => ({
    showToaster: false,
    typeToaster: null,
    message: null,
    errorMessage: null
  }),
  getters: {
    getTypeToaster: (state) => state.typeToaster || 'error',
    getMessage: (state) => state.message,
    getErrorMessage: (state) => state.errorMessage
  },
  actions: {
    setTypeToaster(type) {
      this.typeToaster = type
    },
    setMessage(message) {
      this.message = message
    },
    setErrorMessage(errorMessage) {
      this.errorMessage = errorMessage
    }
  }
})