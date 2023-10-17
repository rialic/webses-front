<template>
  <div class="card">
    <div class="card-body p-4">
      <div class="text-center w-100 m-auto">
        <div class="d-flex justify-content-center">
          <a href="index.html">
            <img :src="mainLogo" alt="" height="80">
          </a>
        </div>

        <p class="my-3">
          Por favor verifique o email enviado em sua caixa de email, caso não encontre o email, pedimos que confira a
          caixa de lixo eletrônico.
        </p>
      </div>

      <div class="d-flex flex-column row-gap-4 align-items-center">
        <fa class="text-success fa-6x" :icon="['fas', 'envelope']" />

        <span class="fs-18 text-muted fw-semibold">Email enviado!</span>
      </div>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-12 text-center">
      <p class="text-muted">
        O email ainda não chegou? Clique em
        <span @click.prevent.stop="resentEmail" class="text-primary fw-semibold ms-1 cursor-pointer">Reenviar email</span>
        para enviar novamente
      </p>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import axios from '@/configs/axios'

/* helper */
const $logo = inject('$logo')

/* images */
const mainLogo = $logo.mainLogo

/* methods */
async function resentEmail() {
  const response = await axios.post('resent-email-verification')

  if (response.status === 200 || response.status === 202) {
    //
  }
}
</script>