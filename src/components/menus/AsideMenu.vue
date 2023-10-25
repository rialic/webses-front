<template>
  <aside
    class="aside-menu position-absolute top-0 d-flex flex-column flex-shrink-0 pt-0 pb-3 px-3 bg-dark h-100"
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

    <section class="aside-accordion mb-auto">
      <div v-for="(module, index) in moduleStore.moduleList" :key="index" class="aside-accordion:tab">
        <input type="radio" ref="menus" name="aside-accordion" :id="module.name.toLowerCase()" @click.stop="goToNavigation(module)">

        <label :for="module.name.toLowerCase()" class="aside-accordion:tab-label">
          {{ module.name }}
        </label>

        <div v-if="module.submodules.length" class="aside-accordion:tab-content">
          <ul class="list-group list-group-flush">
            <li v-for="(submodule, index) in module.submodules" :key="index" class="list-group-item border-0 cursor-pointer">
              {{ submodule.name }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <hr class="border-white">

    <div class="dropdown">
      <a href="#" class="d-flex align-items-center dropdown-toggle dropdown-toggle--no-arrow ps-2 link-opacity-75 text-decoration-none" data-bs-toggle="dropdown">
        <span class="fw-semibold me-2">Alex da Silva</span>
        <fa :icon="['fa', 'fa-arrow-right-from-bracket']"/>
      </a>
      <ul class="dropdown-menu text-small shadow">
        <li><a class="dropdown-item fw-semibold fs-14" href="#">Conta</a></li>
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
import { inject, onMounted, ref } from 'vue'
import { logout } from '@/auth'

/* router */
import { useRouter } from 'vue-router'
import privRoutes from '@/router/priv'

const router = useRouter()

/* store */
import { useModuleStore } from '@/store/moduleStore'

const moduleStore = useModuleStore()

/* helper */
const $logo = inject('$logo')

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
  routeList.value = privRoutes[0].children.filter((route) => route.meta.module)

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

/* datas */
const {
  menus,
  routeList
} = (() => {
  return {
    menus: ref([]),
    routeList: ref([]),
  }
})()

/* methods */
function goToNavigation(module) {
  const moduleHasSubmodule = module.submodules.length

  if (!moduleHasSubmodule) {
    const routeNavigation = routeList.value.find((route) => route.meta.module === module.name.toLowerCase())

    router.push({ name: routeNavigation.name })
    emit('showMenu', false)
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