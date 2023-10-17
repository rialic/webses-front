import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useStateStore = defineStore('stateStore', {
  state: () => ({
    stateList: []
  }),
  actions: {
    async getStates() {
      const response = await axios.get('states')

      try {
        if (response.status === 200) {

          return response
        }
      } catch (error) {
        //
      }
    }
  }
})