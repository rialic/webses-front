import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useCBOStore = defineStore('cboStore', {
  state: () => ({
    cboList: []
  }),
  actions: {
    async getCBO() {
      try {
        const response = await axios.get('cbo')

        if (response.status === 200) {

          return response
        }
      } catch (error) {
        //
      }
    }
  }
})