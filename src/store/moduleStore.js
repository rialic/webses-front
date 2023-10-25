import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useModuleStore = defineStore('moduleStore', {
  state: () => ({
    moduleList: []
  }),
  actions: {
    async getModules() {
      try {
        const response = await axios.get('api/modules')

        if (response.status === 200) {

          return response
        }
      } catch (error) {
        //
      }
    }
  }
})