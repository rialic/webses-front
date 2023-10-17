import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    cityList: []
  }),
  actions: {
    async getCities(filterParams) {
      const response = await axios.get('cities', { params: filterParams })

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