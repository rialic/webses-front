<template>
  <default-container>
    <template #title>
      Web Aulas
    </template>

    <template #actions>
      <button type="button" class="btn btn-outline-blue opacity-75 fw-semibold" style="min-width: 9.375rem;" @click="router.push({ name: 'webclass.participate' })">
        Voltar
      </button>

      <v-action-button :routerName="'webclass'">Nova web aula</v-action-button>

      <button type="button" class="btn btn-outline-blue opacity-75 fw-semibold">
        <fa :icon="['fas', 'fa-magnifying-glass']" />
      </button>
    </template>

    <template #content>
      <div v-if="eventStore.eventList.data?.length" class="w-100">
        <v-table
          :title="'Web aulas'"
          :list="eventStore.eventList"
          :tableColumns="tableColumns"
          :messageOnDelete="'Todos os participantes também serão excluídos nessa ação, tem certeza que deseja excluir essa web aula?'"
          @onEdit="onEditWebclass"
          @onDelete="onDeleteWebclass"/>
      </div>
    </template>
  </default-container>
</template>

<script setup>
/* configs */
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* stores */
import { useEventStore } from '@/store/eventStore'

const eventStore = useEventStore()

/* components */
import VTable from '@/components/tables/VTable.vue'

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
  watchEffect(async() => {
    params.value = { page: props.page, limit: props.limit }
    getData()
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
const { params } = {
  params: ref()
}

/* methods */
async function getData(filterParams = {}) {
  eventStore.eventList = []
  eventStore.eventList = (await eventStore.getEvents(params.value))
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
</script>

<style></style>