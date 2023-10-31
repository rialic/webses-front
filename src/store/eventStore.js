import { defineStore } from 'pinia'
import axios from '@/configs/axios'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = computed(() => useRoute())

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    eventList: [],
  }),
  actions: {
    async getEvents(filterParams) {
      try {
        const response = await axios.get('api/events', { params: filterParams })

        if (response.status === 200) {

          return response
        }
      } catch (error) {
        //
      }
    },
    async deleteEvent(uuid) {
      try {
        const response = await axios.delete(`api/events/${uuid}`)

        if (response.status === 200) {

          return response
        }
      } catch (error) {
        //
      }
    },
    async storeEventParticipant(params) {
      try {
        return await axios.post('api/event-participants', params)
      } catch (error) {

      }
    }
  }
})