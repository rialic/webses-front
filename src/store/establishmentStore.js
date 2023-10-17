import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useEstablishmentStore = defineStore('establishmentStore', {
  state: () => ({
    establishmentList: []
  }),
  actions: {
    async getEstablishments(filterParams) {
      const response = await axios.get('establishments', { params: filterParams })

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