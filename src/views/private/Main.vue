<template>
  <div class="main-container" @click="onClickContainer">
    <nav-menu @showMenu="showAsideMenu = $event" data-menu="bars-menu"></nav-menu>

    <div class="content">
      <aside-menu :showAsideMenu="showAsideMenu" @showMenu="showAsideMenu = $event" data-menu="aside-menu"></aside-menu>

      <div class="main container my-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
/* configs */
import { inject, ref } from 'vue'

const $empty = inject('$empty')

/* components */
import NavMenu from '@/components/menus/NavMenu.vue'
import AsideMenu from '@/components/menus/AsideMenu.vue'

const {
  showAsideMenu
} = (() => {
  return {
    showAsideMenu: ref(false)
  }
})()

function onClickContainer(element) {
  const asideMenu = element.target.closest('[data-menu="aside-menu"]')
  const barsMenu = element.target.closest('[data-menu="bars-menu"]')
  const isClikedOutsideContainer = $empty(asideMenu) && $empty(barsMenu)

  if (isClikedOutsideContainer) {
    showAsideMenu.value = false
  }
}

</script>

<style lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    display: flex;
    flex: 1;

    .main {
      flex: 1;
    }
  }
}
</style>