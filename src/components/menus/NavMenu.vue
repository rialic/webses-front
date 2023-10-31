<template>
  <header class="border-bottom shadow-sm" style="height: 3.75rem">
    <div class="container-fluid d-grid gap-3 h-100" style="grid-template-columns: 1fr 2fr;">
      <div class="d-flex justify-content-start align-items-center w-100 h-100">
        <a href="/" class="d-flex align-items-center justify-content-start text-decoration-none">
          <img :src="navLogo" class="img-fluid" alt="aside-log" height="45">
        </a>

        <div @click.stop="emit('showMenu', true)" class="d-flex align-items-center ms-4 cursor-pointer h-100">
          <fa class="text-muted" :icon="['fas', 'fa-bars']" :size="'2xl'"/>
        </div>
      </div>

      <div class="d-flex justify-content-end column-gap-3 w-100 h-100">
        <div class="flex-shrink-0 dropdown">
          <button
            type="button"
            class="d-flex border-0 bg-transparent link-body-emphasis text-decoration-none text-muted dropdown-toggle dropdown-toggle--no-arrow h-100 align-items-center"
            data-bs-toggle="dropdown">
            <fa :icon="['fas', 'fa-user-large']" :size="'lg'"/>
          </button>

          <ul class="dropdown-menu text-small shadow" style="">
            <li><a class="dropdown-item fw-semibold fs-14" href="#">Minha Conta</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li class="dropdown-item fw-semibold fs-14" @click="logout">Sair</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
/* configs */
import { inject } from 'vue'
import { logout } from '@/auth'

/* emits */
const emit = defineEmits(['showMenu'])

/* helper */
const $logo = inject('$logo')

/* images */
const navLogo = $logo.navLogo
</script>

<style>

</style>