<template>
  <div class="card">
    <div class="card-body p-4">
      <div class="text-center w-100 m-auto">
        <div class="d-flex justify-content-center">
          <a href="index.html">
            <img :src="mainLogo" alt="" height="80">
          </a>
        </div>

        <p class="mb-4 mt-3">Entre com o seu email e senha para acessar o nosso painel.</p>
      </div>

      <form @submit.prevent="onLoginDone(login(form))">
        <div class="mb-4">
          <v-input :label="'Email, CPF'" :name="'email'" v-model="form.email" :errors="errors" />
        </div>

        <div class="mb-4">
          <v-input :label="'Senha'" :type="'password'" :name="'password'" v-model="form.password" :errors="errors" />
        </div>

        <v-check class="mb-3" :label="'Lembrar-me'" :name="'remember-me'" :checked="false" v-model="form.remember_me" :errors="errors">
        </v-check>

        <div class="d-grid mb-0 text-center">
          <button class="btn btn-primary fw-semibold" type="submit"> Entrar </button>
        </div>
      </form>

      <!-- <div class="text-center">
        <h6 class="mt-3 text-dark">Entrar com</h6>
        <ul class="list-inline mt-3 mb-0">
          <li class="list-inline-item">
            <a href="#" class="border border-dark border-2 rounded-circle p-2">
              <fa class="text-dark" :icon="['fas', 'envelope']" />
            </a>
          </li>
        </ul>
      </div> -->
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-12 text-center">
      <p class="text-muted">Não possui uma conta?
        <router-link :to="{ name: 'auth.register' }" class="text-primary fw-semibold ms-1">Inscreva-se</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
// configs
import { ref, inject } from 'vue'
import { login, errors } from '@/auth'

// helper
const $logo = inject('$logo')

// images
const mainLogo = $logo.mainLogo

// datas
const form = ref({
  email: null,
  password: null,
  remember_me: false,
  device_name: 'chrome'
})

// methods
function onLoginDone() {
  //
}
</script>

<style></style>