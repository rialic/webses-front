<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="card-title mb-3">
        <div v-if="props.list.meta?.links?.length" class="fs-22 fw-semibold text-muted m-0">
          {{props.list.meta.total }} {{ props.title }}
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-white table-striped table-hover table-bordered m-0">
          <thead>
            <tr>
              <th v-for="(column, index) in tableColumns" :key="index" :class="`${(column.span) ? `col-${column.span}` : 'col'}`" class="text-muted">
                {{ column.tableHeader }}
              </th>
              <th class="col-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in props.list.data" :key="index">
              <td v-for="(column, tableIndex) in tableColumns" :key="tableIndex">
                {{ getTruncateText(item[column.resource]) }}
              </td>
              <td>
                <div class="d-flex column-gap-2 justify-content-center">
                  <button type="button" class="btn btn-sm btn-success px-2" @click="emit('onEdit', item.uuid)">
                    <fa :icon="['far', 'fa-pen-to-square']" :size="'lg'" />
                  </button>

                  <button type="button" class="btn btn-sm btn-danger px-2" @click="showDeleteModal = true; uuidDraftDelete = item.uuid">
                    <fa :icon="['far', 'fa-circle-xmark']" :size="'lg'" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav v-if="getTotalLinks" class="d-flex justify-content-end">
        <ul class="pagination mt-3 mb-0">
          <template v-for="(link, index) in getLinks" :key="index">
            <li class="page-item" :class="{ 'page-item--active': link.active }">
              <div class="page-link fw-semibold cursor-pointer opacity-75" :class="{ 'active': link.active }"
                @click="goToPageNavigation(link.url)">
                <span v-if="index === 0" aria-hidden="true">
                  &laquo;
                </span>

                <span v-else-if="index === (getTotalLinks - 1)">
                  &raquo;
                </span>

                <span v-else>
                  {{ link.label }}
                </span>
              </div>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </div>

  <delete-modal :show="showDeleteModal" @onDelete="onDelete" @close="showDeleteModal = false">
    <template #title>
      Excluir
    </template>

    <template #content>
      {{  messageOnDelete }}
    </template>
  </delete-modal>
</template>

<script setup>
/* configs */
import { computed, inject, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

/* components */
import DeleteModal from '@/components/modals/DeleteModal.vue'

/* helpers */
const $parseFilters = inject('$parseFilters')
const $parseQueryStringToObject = inject('$parseQueryStringToObject')

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  list: {
    type: Object,
    required: true
  },
  tableColumns: {
    type: Array,
    required: true
  },
  messageOnDelete: {
    type: String,
    default: 'Tem certeza que deseja excluir esse item?'
  }
})

const emit = defineEmits(['onEdit', 'onDelete'])

const getTotalLinks = computed(() => {
  return props.list.meta?.links?.length
})

const getLinks = computed(() => {
  return props.list.meta?.links
})

const getTruncateText = computed(() => {
  return (item) => (item?.length > 65 ) ? `${item.slice(0, 65)}...` : item
})

/* data */
const { uuidDraftDelete, showDeleteModal } = {
  uuidDraftDelete: ref(),
  showDeleteModal: ref(false),
}

/* methods */
async function goToPageNavigation(params) {
  const query = $parseFilters($parseQueryStringToObject(params))

  router.push({ name: route.query.pageName, query })
}

function onDelete() {
  emit('onDelete', uuidDraftDelete.value)
  showDeleteModal.value = false
}
</script>

<style lang="scss" scoped>
@media screen and ( max-width: 500px ){
li.page-item {
    display: none;
}

.page-item:first-child,
.page-item:last-child, .page-item:nth-last-child(2), .page-item:nth-last-child(3), .page-item:nth-last-child(4),
.page-item.page-item--active, .page-item.page-item--active + .page-item {
    display: block;
}
}
</style>