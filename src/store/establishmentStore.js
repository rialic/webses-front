import { defineStore } from 'pinia'
import axios from '@/configs/axios'

export const useEstablishmentStore = defineStore('establishmentStore', {
  state: () => ({
    establishmentList: []
  }),
  actions: {
    async getEstablishments(filterParams) {
      try {
        const response = await axios.get('establishments', { withCredentials: false, params: filterParams })

        if (response.status === 200) {

          return response
        }
      } catch (error) {
        //
      }
    }
  }
})