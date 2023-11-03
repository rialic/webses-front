<template>
  <default-container>
    <template #title>
      Participe
    </template>

    <template #actions>
      <v-can :pass="['WEB.EVENT--VIEW', 'ADMIN']">
        <v-action-button :routerName="'webclass'">Web aulas</v-action-button>
      </v-can>

      <v-action-button :routerName="'webclass.certificate'">Certificados</v-action-button>
    </template>

    <template #addons>
      <v-addon-button @click="getData">
        <fa :icon="['fas', 'fa-arrows-rotate']" :size="'sm'"/>
      </v-addon-button>
    </template>

    <template #content>
      <div class="d-flex flex-column row-gap-4 w-100 shadow-sm">
        <template v-if="eventStore.eventList.length">
          <div v-for="(event, index) in eventStore.eventList" :key="index" @click="onSaveEventParticipant(event)"
            class="card cursor-pointer">
            <div class="row g-0">
              <div class="d-none d-md-flex col-md-2 justify-content-center align-items-center">
                <fa class="text-primary" :icon="['far', 'fa-calendar-days']" :size="'4x'" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title text-muted fw-semibold">{{ event.title }}</h5>

                  <div class="card-text text-body-secondary my-3">
                    {{ event.description }}
                  </div>

                  <div class="d-flex flex-wrap justify-content-between align-items-end">
                    <div class="d-flex flex-column card-text my-2">
                      <small class="text-body-secondary fw-semibold">Data</small>
                      <small class="text-body-secondary">{{ event.start_at_formatted }} até {{ event.end_at_formatted
                      }}</small>
                    </div>

                    <button type="button" class="btn btn-dark btn-sm fw-semibold">
                      Participar

                      <fa class="ms-2" :icon="['far', 'fa-circle-right']" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div v-else>
          <div class="card align-items-center shadow-sm">
            <fa class="text-muted my-3" :icon="['fas', 'fa-magnifying-glass']" :size="'6x'" />

            <h5 class="mb-2 fw-semibold opacity-75">Desculpe não temos web aulas disponíveis.</h5>
          </div>
        </div>
      </div>
    </template>

    <template #modals>
      <div id="redirectModal" class="modal fade" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-semibold text-muted">Redirecionamento</h5>
            </div>
            <div class="modal-body text-body-secondary text-center">
              <h5 class="fs-18">
                guarde você será redirecionando para a página web em <strong>{{ redirectModalCountdown }}</strong>
                segundo(s)
              </h5>

              <div class="spinner-border text-primary " role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </default-container>
</template>

<script setup>
/* configs */
import { onMounted, inject, ref } from 'vue'
import { user } from '@/auth'

/* stores */
import { useEventStore } from '@/store/eventStore'

const eventStore = useEventStore()

/* helpers */
const $parseFilters = inject('$parseFilters')
const bootstrap = inject('bootstrap')

onMounted(async() => {
  getData()
  redirectModal.value = new bootstrap.Modal('#redirectModal', {})
})

/* datas */
const { redirectModal, redirectModalCountdown } =  {
  redirectModal: ref(),
  redirectModalCountdown: ref(3)
}

/* methods */
async function onSaveEventParticipant(event) {
  let pid = null
  const params = { 'event_uuid': event.uuid, 'user_uuid':  user.value.uuid }
  const response = (await eventStore.storeEventParticipant(params)).data

  redirectModal.value.show()

  pid = setInterval(() => {
    redirectModalCountdown.value--

    if (redirectModalCountdown.value === 0) {
      clearTimeout(pid)
      window.open(response.room_link)
      redirectModalCountdown.value = 3
      redirectModal.value.hide()
    }
  }, 1000)
}

async function getData() {
  const filterParams = $parseFilters({ 'events_availables': new Date() })
  eventStore.eventList = (await eventStore.getEvents(filterParams)).data
}

</script>

<style></style>