import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useCBOStore = (defineStore('cboStore', {
  state: () => ({
    cboList: []
  }),
  actions: {
    async getCBO() {
      const response = await axios.get('api/cbo')

      try {
        if (response.status === 200) {

          return response.data
        }
      } catch (error) {
        //
      }
    }
  }
}))()