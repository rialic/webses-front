<template>
  <default-container>
    <template #title>
      Web Aulas
    </template>

    <template #actions>
      <v-can :pass="['WEB.EVENT--CREATE', 'ADMIN']">
        <v-action-button :routerName="'webclass.create'">
          Criar web aula
        </v-action-button>
      </v-can>

      <v-action-button @click="router.push({ name: 'webclass.participate' })">
        Participe
      </v-action-button>

      <v-action-button @click="showSearchModal = true">
        <fa :icon="['fas', 'fa-magnifying-glass']" :size="'sm'" />

        Pesquisar
      </v-action-button>
    </template>

    <template #addons>
      <v-addon-button @click="clearData">
        <fa :icon="['fas', 'fa-broom']"/>
      </v-addon-button>
    </template>

    <template #content>
      <v-table
        :title="'Web aulas'"
        :filterParams="params"
        :list="eventStore.eventList"
        :tableColumns="tableColumns"
        :editGuard="['ADMIN', 'WEB.MENU--EDIT']"
        :messageOnDelete="'Todos os participantes também serão excluídos nessa ação, tem certeza que deseja excluir essa web aula?'"
        @onEdit="onEditWebclass"
        @onDelete="onDeleteWebclass"/>
    </template>

    <template #modals>
      <search-modal :show="showSearchModal" @onSearch="onSearch" @close="onCloseSearchModal">
        <template #content>
          <div class="d-flex flex-column justify-content-end mx-5 my-3">
              <div class="mb-4">
                <v-input :label="'Web'" :name="'name'" v-model="form.name"/>
              </div>

              <div class="mb-4">
                <v-input :label="'Descrição'" :name="'description'" v-model="form.description"/>
              </div>

              <div class="mb-4">
                <v-datepicker :label="'Início evento'" name="start_at" :selectedDate="form.start_at" v-model="form.start_at"></v-datepicker>
              </div>

              <div class="mb-4">
                <v-datepicker :label="'Fim evento'" name="end_at" :selectedDate="form.end_at" v-model="form.end_at"></v-datepicker>
              </div>

              <div class="mb-4">
                <v-input :label="'Descritor bireme'" :name="'bireme_code'" v-model="form.bireme_code"/>
              </div>
          </div>
        </template>
      </search-modal>
    </template>
  </default-container>
</template>

<script setup>
/* configs */
import { computed, inject, onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

/* stores */
import { useEventStore } from '@/store/eventStore'

const eventStore = useEventStore()

/* components */
import VTable from '@/components/tables/VTable.vue'
import SearchModal from '@/components/modals/SearchModal.vue'

const $parseFilters = inject('$parseFilters')
const $empty = inject('$empty')

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  params.value = Object.assign({ page: props.page, limit: props.limit }, filterParams.value || route.query)

  watchEffect(async() => {
    eventStore.eventList = (await eventStore.getEvents(params.value))
  })
})

const tableColumns = computed(() => {
  return [
    { 'tableHeader': 'Web', 'resource': 'title', 'span': 3 },
    { 'tableHeader': 'Descrição', 'resource': 'description', 'span': 4 },
    { 'tableHeader': 'Início evento', 'resource': 'start_at_formatted', 'span': 2 },
    { 'tableHeader': 'Fim evento', 'resource': 'end_at_formatted', 'span': 2 },
    { 'tableHeader': 'Descritor bireme', 'resource': 'bireme_code', 'span': 2 }
  ]
})

/* data */
const { showSearchModal, filterParams, params, form } = {
  showSearchModal: ref(false),
  filterParams: ref(),
  params: ref(),
  form: ref({
    name: null,
    description: null,
    start_at: null,
    end_at: null,
    bireme_code: null
  })
}

// TODO COLOCAR METODOS EM UM "MIXIN" PARA FICAR REUTILIZÁVEL
// TODO CRIAR EDIT E UPDATE DE WEBAULAS

/* methods */
async function getData() {
  if ($empty(filterParams.value)) {
    params.value = { page: 1, limit: 20 }
  }

  if (!$empty(filterParams.value)) {
    params.value = { ...params.value, page: 1 }
    filterParams.value = Object.assign(params.value, filterParams.value)
  }

  eventStore.eventList = []
}

function clearData() {
  filterParams.value = null
  params.value = { page: 1, limit: 20 }

  eventStore.eventList = []
}

function onEditWebclass(uuid) {
  router.push({ name: 'webclass.edit', params: { uuid }})
}

async function onDeleteWebclass(uuid) {
  const response = await eventStore.deleteEvent(uuid)

  if (response.status === 200) {
    getData()
  }
}

function onSearch() {
  filterParams.value = $parseFilters(form.value)
  getData()
  onCloseSearchModal()
}

function onCloseSearchModal() {
  showSearchModal.value = false

  for (const prop in form.value) {
    form.value[prop] = null
  }
}
</script>

<style></style>