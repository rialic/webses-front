<template>
  <div class="card">
    <div class="card-body p-4">
      <div class="text-center w-100 m-auto">
        <div class="d-flex justify-content-center">
          <a href="index.html">
            <img :src="mainLogo" alt="" height="80">
          </a>
        </div>

        <p class="mb-4 mt-3">Informe seus dados para ter acesso ao sistema.</p>
      </div>

      <form action="#">
        <div class="d-flex column-gap-2 align-items-center">
          <v-input class="flex-grow-1" :label="'CPF'" @input.prevent="onSearchCPFDataCNES" :name="'cpf'" :mask="'cpf'" v-model="form.cpf" />

          <div v-if="showSpinner" class="spinner-border text-primary spinner-border-sm"></div>
        </div>

        <hr class="my-3">

        <h6 class="mb-4 fw-semibold">Dados de acesso</h6>

        <div class="mb-4">
          <v-input :label="'Nome'" :name="'nome'" v-model="form.name" />
        </div>

        <div class="mb-4">
          <v-select :name="'sex'" :listLabel="'label'" :label="'Sexo'" :list="sexList" v-model="form.sex"></v-select>
        </div>

        <div class="mb-4">
          <v-input :label="'Email'" :name="'email'" v-model="form.email" />
        </div>

        <div class="d-flex mb-4 column-gap-2">
          <v-select
            class="w-25"
            :name="'state'"
            :listLabel="'acronym'"
            :label="'Estado'"
            :list="useStateStore.stateList"
            :selectedVal="form.state"
            v-model="form.state">
          </v-select>

          <v-select
            class="flex-fill"
            :name="'city'"
            :listLabel="'name'"
            :label="'Cidade'"
            :list="useCityStore.cityList"
            :reset="cityReset"
            @onResetDone="cityReset = $event"
            v-model="form.city">
          </v-select>
        </div>

        <div class="mb-4">
          <v-select
            class="flex-fill"
            :name="'establishment'"
            :listLabel="'name'"
            :label="'Unidade de Saúde'"
            :list="useEstablishmentStore.establishmentList"
            :reset="establishmentReset"
            @onResetDone="establishmentReset = $event"
            v-model="form.establishment">
          </v-select>
        </div>

        <div class="mb-4">
          <v-select
            :name="'cbo'"
            :listLabel="'name'"
            :label="'CBO'"
            :list="useCBOStore.cboList"
            v-model="form.cbo">
          </v-select>
        </div>

        <div class="mb-4">
          <v-input :type="'password'" :label="'Senha'" :name="'senha'" v-model="form.password" />
        </div>

        <div class="mb-4">
          <v-input :type="'password'" :label="'Confirma senha'" :name="'confirm_password'" v-model="form.confirm_password" />
        </div>

        <div class="d-grid mb-0 text-center">
          <button class="btn btn-primary fw-semibold" type="submit"> Cadastrar </button>
        </div>
      </form>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-12 text-center">
      <p class="text-muted">Já possui uma conta?
        <router-link :to="{ name: 'auth.login' }" class="text-primary fw-semibold ms-1">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
/* configs */
import { ref, inject, onMounted, watch } from 'vue'
import axios from '@/configs/axios'

/* store */
import { useStateStore } from '@/store/stateStore'
import { useCityStore } from '@/store/cityStore'
import { useEstablishmentStore } from '@/store/establishmentStore'
import { useCBOStore } from '@/store/cboStore'

/* helper */
const $logo = inject('$logo')
const $parseFilters = inject('$parseFilters')
const $lowerCaseName = inject('$lowerCaseName')

/* datas */
const { mainLogo, showSpinner, sexList, form, cityReset, establishmentReset } = (() => {
  return {
    mainLogo: $logo.mainLogo,
    showSpinner: ref(false),
    // stateSelectedVal: ref(''),
    sexList: [{ label: 'Masculino',  code: 'm' }, { label: 'Feminino', code: 'f' }],
    form: ref({ cpf: null, name: null, sex: null, state: null, city: null, establishment: null, cbo: null, email: null, password: null, confirm_password: null }),
    cityReset: ref(false),
    establishmentReset: ref(false)
  }
})()

onMounted(async() => {
  useStateStore.stateList = await useStateStore.getStates()
  useCBOStore.cboList = await useCBOStore.getCBO()
})

/* watch */
watch(() => form.value.state, async() => {
  const filterParams = $parseFilters({ state: form.value.state })

  const cityList = await useCityStore.getCities(filterParams)
  useCityStore.cityList = cityList.map((city) => ({ ...city, 'name': $lowerCaseName(city.name) }) )

  if (form.value.city) {
    form.value.city = null
    form.value.establishment = null
    cityReset.value = true
    establishmentReset.value = true
  }
})

watch(() => form.value.city, async() => {
  if (form.value?.city) {
    const filterParams = $parseFilters({ city: form.value.city, legal_nature: 'ADMINISTRAÇÃO PÚBLICA' })

    const establishmentList = await useEstablishmentStore.getEstablishments(filterParams)
    useEstablishmentStore.establishmentList = establishmentList.map((establishment) => ({ ...establishment, 'name': $lowerCaseName(establishment.name) }))

    if (form.value.establishment) {
      form.value.establishment = null
      establishmentReset.value = true
    }
  }
})

/* methods */
async function onSearchCPFDataCNES(inputElement) {
  let cpf = inputElement.target.value
  const cpfRegex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/g
  const isValidCPF = cpfRegex.test(cpf)

  if (isValidCPF) {
    try {
      showSpinner.value = true
      const response = await axios.get(`api/datacnes-user?filter:cpf=${cpf.replaceAll('.', '').replace('-', '')}`)

      if (response.status === 200) {
        const user = response.data.data.user

        if (user) {
          // TODO GET VÍNCULOS BY LEGAL STATE = ADMINISTRAÇÃO PÚBLICA , SUS = YES
          const state = useStateStore.stateList.find((state) => state.acronym === user.vinculos[0].estado)

          form.value.name = $lowerCaseName(user.nome)
          form.value.state = state.uuid
        }

        showSpinner.value = false
      }
    } catch (error) {
      showSpinner.value = false
    }
  }
}
</script>

<style>

</style>