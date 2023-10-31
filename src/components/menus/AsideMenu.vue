<template>
  <aside
    class="aside-menu position-absolute top-0 d-flex flex-column flex-shrink-0 pt-0 pb-3 px-3 bg-dark h-100 z-index-999"
    :class="[{'aside-menu--show' : props.showAsideMenu}]">
    <div class="d-flex justify-content-between align-items-center" style="height: 3.75rem">
      <a href="/" class="d-flex align-items-center justify-content-start text-decoration-none">
        <img :src="asideLogo" class="img-fluid" alt="aside-log" height="45">
      </a>

      <div class="cursor-pointer" @click.stop="emit('showMenu', false)">
        <fa class="text-white" :icon="['fas', 'fa-xmark']" :size="'xl'" />
      </div>
    </div>

    <hr class="border-white m-0 mb-3">

    <section v-if="getGuardModuleNavigation.length" class="aside-accordion mb-auto">
      <template v-for="(module, modIndex) in moduleStore.moduleList" :key="modIndex">
        <v-can :pass="getGuardModuleNavigation[modIndex][module.name.toLowerCase()]">
          <div class="aside-accordion:tab">
            <input type="radio" ref="menus" name="aside-accordion" :id="module.name.toLowerCase()" @click.stop="goToNavigation(module)">

            <label @mouseenter="toggleAnimation" @mouseleave="toggleAnimation" :for="module.name.toLowerCase()" class="d-flex justify-content-start column-gap-2 align-items-center aside-accordion:tab-label">
              <fa :icon="['fas', getIconModule[module.name.toLowerCase()]]" :size="'sm'"/>
              <div>{{ module.name }}</div>
            </label>

            <div v-if="module.submodules.length" class="aside-accordion:tab-content">
              <ul class="list-group list-group-flush">
                <template v-for="(submodule, subIndex) in module.submodules" :key="subIndex">
                  <v-can :pass="getGuardSubmoduleNavigation[subIndex][submodule.name.toLowerCase()]">
                    <li class="list-group-item border-0 cursor-pointer" @click.stop="goToNavigation(module, submodule)">
                      {{ submodule.name }}
                    </li>
                  </v-can>
                </template>
              </ul>
            </div>
          </div>
        </v-can>
      </template>
    </section>

    <hr class="border-white">

    <div class="dropdown">
      <a href="#" class="d-flex align-items-center dropdown-toggle dropdown-toggle--no-arrow ps-2 link-opacity-75 text-decoration-none" data-bs-toggle="dropdown">
        <span class="fw-semibold me-2">Alex da Silva</span>
        <fa :icon="['fa', 'fa-arrow-right-from-bracket']"/>
      </a>
      <ul class="dropdown-menu text-small shadow">
        <li><a class="dropdown-item fw-semibold fs-14" href="#">Minha Conta</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li class="dropdown-item fw-semibold fs-14 cursor-pointer" @click="logout">Sair</li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
/* configs */
import { computed, inject, onMounted, ref } from 'vue'
import { logout } from '@/auth'

/* router */
import { useRouter } from 'vue-router'
import privateRoutes from '@/router/private'

const router = useRouter()

/* store */
import { useModuleStore } from '@/store/moduleStore'

const moduleStore = useModuleStore()

/* helper */
const $logo = inject('$logo')
const $empty = inject('$empty')

/* images */
const asideLogo = $logo.asideLogo

/* emits */
const emit = defineEmits(['showMenu'])

/* props */
const props = defineProps({
  showAsideMenu: {
    type: Boolean,
    default: false
  }
})

onMounted(async() => {
  moduleStore.moduleList = (await moduleStore.getModules()).data
  routeList.value = privateRoutes[0].children.filter((route) => route.meta.module)

  setTimeout(() => {
    const module = router.currentRoute.value.meta.module

    menus.value.forEach((menu) => {
      const isModuleRouteMenu = menu.getAttribute('id') === module

      if (isModuleRouteMenu) {
        menu.checked = true
      }
    })
  }, 100)
})

const getIconModule = computed(() => {
  return {
    'dashboard': 'fa-chart-line',
    'web online': 'fa-display',
    'teleconsultoria': 'fa-laptop-medical',
    'configurações': 'fa-gear'
  }
})

const getGuardModuleNavigation = computed(() => {
  return routeList.value.map((route) => ({ [`${route.meta.module}`]: [...route.meta.guard] }))
})

const getGuardSubmoduleNavigation = computed(() => {
  return routeList.value
    .reduce((acc, route) => (route.children) ? [...route.children] : acc, [])
    .map((route) => ({ [`${route.meta.submodule}`]: [...route.meta.guard] }))
})

/* datas */
const {
  menus,
  routeList,
} = (() => {
  return {
    menus: ref([]),
    routeList: ref([]),
  }
})()

/* methods */
function toggleAnimation(element) {
  const icon = element.target.querySelector('svg')

  icon.classList.toggle('fa-bounce')
}

function goToNavigation(module, submodule = {}) {
  const moduleHasSubmodule = module.submodules.length
  const routeNavigation = routeList.value.find((route) => route.meta.module === module.name.toLowerCase())

  if ($empty(moduleHasSubmodule)) {
    router.push({ name: routeNavigation.name })
    return emit('showMenu', false)
  }

  if (!$empty(submodule)) {
    let childRouteNavigation = routeNavigation.children.find((route) => route.path === submodule.name.split(' ').join('-').toLowerCase())

    router.push({ name: childRouteNavigation.name })
    return emit('showMenu', false)
  }
}
</script>

<style lang="scss">
.aside-menu {
  left: -18.75rem;
  width: 18.75rem;
  transition: left 0.3s;

  &.aside-menu--show {
    left: 0;
  }
}
</style>