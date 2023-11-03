<template>
  <form @submit.prevent="onSaveWebClass">
    <form-container>
      <template #content>
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="card-title mb-3">
              <div class="fs-22 fw-semibold text-muted m-0">
                Web aula
              </div>
            </div>

            <div class="mb-4">
              <v-input :label="'Web'" :name="'name'" v-model="form.name" :error="errors" />
            </div>

            <div class="mb-4">
              <v-input :label="'Descrição'" :name="'description'" v-model="form.description" :error="errors" />
            </div>

            <div class="mb-4">
              <div class="d-flex flex-wrap flex-sm-nowrap gap-4">
                <v-datepicker class="w-100" :label="'Início evento'" name="start_at" :selectedDate="form.start_at" v-model="form.start_at" :error="errors"></v-datepicker>

                <v-input class="flex-fill"
                  :label="'Antecipar evento em'"
                  :name="'start_minutes_additions'"
                  v-model="form.start_minutes_additions"
                  :inputGroupText="'minutos'"
                  :error="errors" />
              </div>
            </div>

            <div class="mb-4">
              <div class="d-flex flex-wrap flex-sm-nowrap gap-4">
                <v-datepicker class="w-100" :label="'Fim evento'" name="end_at" :selectedDate="form.end_at" v-model="form.end_at" :error="errors"></v-datepicker>

                <v-input class="flex-fill"
                  :label="'Fechar evento após'"
                  :name="'end_minutes_additions'"
                  v-model="form.end_minutes_additions"
                  :inputGroupText="'minutos'"
                  :error="errors" />
              </div>
            </div>

            <div class="mb-4">
              <v-input :label="'URL Sala Virtual'" :name="'room_link'" v-model="form.room_link" :error="errors" />
            </div>

            <div class="mb-4">
              <v-input :label="'Descritor bireme'" :name="'bireme_code'" v-model="form.bireme_code" :error="errors" />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="d-flex justify-content-center column-gap-3">
          <v-action-button :btnOutline="false" :color="'blue'" class="opacity-75" @click="router.push({ name: 'webclass' })">
            Voltar
          </v-action-button>

          <v-action-button :type="'submit'" :btnOutline="false" :color="'success'" class="opacity-75">
            Salvar
          </v-action-button>
        </div>
      </template>
    </form-container>
  </form>
</template>

<script setup>
/* configs */
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* stores */
import { useEventStore } from '@/store/eventStore'

const eventStore = useEventStore()

/* datas */
const { errors, form } = {
  errors: ref(null),
  form: ref({
    name: null,
    description: null,
    start_at: null,
    start_minutes_additions: ref(15),
    end_minutes_additions: ref(15),
    end_at: null,
    room_link: null,
    bireme_code: null,
    created_by: JSON.parse(sessionStorage.getItem('user')).uuid
  })
}

/* methods */
async function onSaveWebClass() {
  const response = await eventStore.storeEvents(form.value)

  if (response.status === 422) {
    errors.value = null
    errors.value = response.data.errors

    return
  }

  router.push({ name: 'webclass' })
}
</script>

<style></style>