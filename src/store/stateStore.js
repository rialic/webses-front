import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useStateStore = (defineStore('stateStore', {
  state: () => ({
    stateList: []
  }),
  actions: {
    async getStates() {
      const response = await axios.get('api/states')

      try {
        if (response.status === 200) {

          return response.data.data
        }
      } catch (error) {
        //
      }
    }
  }
}))()