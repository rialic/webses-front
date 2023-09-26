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

      <form @submit.prevent="onRegisterDone(register(form))" class="needs-validation was-validated" novalidate>
        <div class="d-flex column-gap-2 align-items-center">
          <v-input class="flex-grow-1" :label="'CPF'" @input.prevent="onSearchCPFDataCNES" :name="'cpf'" :mask="'cpf'" v-model="form.cpf" :error="errors"/>

          <div v-if="showSpinner" class="spinner-border text-primary spinner-border-sm"></div>
        </div>

        <div v-show="showRegisterForm">
          <hr class="my-3">

          <h6 class="mb-4 fw-semibold">Dados de acesso</h6>

          <div class="mb-4">
            <v-input :disabled="Boolean(user)" :label="'Nome'" :name="'nome'" v-model="form.name" :error="errors"/>
          </div>

          <div class="mb-4">
            <v-select
              :name="'sex'"
              :listLabel="'label'"
              :label="'Sexo'"
              :list="sexList"
              :selectedVal="form.sex"
              v-model="form.sex"
              :error="errors">
            </v-select>
          </div>

          <div class="mb-4">
            <v-input :label="'Email'" :name="'email'" v-model="form.email" :error="errors"/>
          </div>

          <div class="d-flex mb-4 column-gap-2">
            <v-select
              class="w-25"
              :disabled="Boolean(user?.relationship) && Boolean(form.state)"
              :name="'state'"
              :listLabel="'acronym'"
              :label="'Estado'"
              :list="useStateStore.stateList"
              :selectedVal="form.state"
              v-model="form.state"
              :error="errors">
            </v-select>

            <v-select
              class="flex-fill"
              :disabled="Boolean(user?.relationship) && Boolean(form.city)"
              :name="'city'"
              :listLabel="'name'"
              :label="'Cidade'"
              :list="useCityStore.cityList"
              :reset="cityReset"
              @onResetDone="cityReset = $event"
              :selectedVal="form.city"
              v-model="form.city"
              :error="errors">
            </v-select>
          </div>

          <div class="mb-4">
            <v-select
              class="flex-fill"
              :disabled="Boolean(user?.relationship) && Boolean(form.establishment)"
              :name="'establishment'"
              :listLabel="'name'"
              :label="'Unidade de Saúde'"
              :list="useEstablishmentStore.establishmentList"
              :reset="establishmentReset"
              @onResetDone="establishmentReset = $event"
              :selectedVal="form.establishment"
              v-model="form.establishment"
              :error="errors">
            </v-select>
          </div>

          <div class="mb-4">
            <v-select
              :disabled="Boolean(user?.relationship) && Boolean(form.cbo)"
              :name="'cbo'"
              :listLabel="'name'"
              :label="'CBO'"
              :list="useCBOStore.cboList"
              :selectedVal="form.cbo"
              v-model="form.cbo"
              :error="errors">
            </v-select>
          </div>

          <div class="mb-4">
            <v-input :type="'password'" :label="'Senha'" :name="'password'" v-model="form.password" :error="errors"/>
          </div>

          <div class="mb-4">
            <v-input :type="'password'" :label="'Confirma senha'" :name="'confirm_password'" v-model="form.confirm_password" :error="errors"/>
          </div>

          <div class="d-grid mb-0 text-center">
            <button class="btn btn-primary fw-semibold" type="submit"> Cadastrar </button>
          </div>
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
import { register } from '@/auth'
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
const {
  errors,
  mainLogo,
  showRegisterForm,
  showSpinner,
  user,
  sexList,
  form,
  cityReset,
  establishmentReset
} = (() => {
  return {
    errors: ref(null),
    mainLogo: $logo.mainLogo,
    showRegisterForm: ref(false),
    showSpinner: ref(false),
    user: ref(),
    sexList: [{ label: 'Masculino', code: 'm' }, { label: 'Feminino', code: 'f' }],
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
watch(() => [form.value.state, user], async() => {
  if(form.value.state) {
    const filterParams = $parseFilters({ state: form.value.state })
    const cityList = await useCityStore.getCities(filterParams)

    useCityStore.cityList = cityList.map((city) => ({ ...city, 'name': $lowerCaseName(city.name) }) )

    if (form.value.city) {
      form.value.city = null
      form.value.establishment = null
      cityReset.value = true
      establishmentReset.value = true
    }

    if (user.value.relationship) {
      const city = useCityStore.cityList.find((city) => city.ibge_code_city === user.value.relationship.coMun)
      form.value.city = city?.uuid
    }
  }
})

watch(() => form.value.city, async() => {
  if (form.value.city) {
    const filterParams = $parseFilters({ city: form.value.city, legal_nature: 'ADMINISTRAÇÃO PÚBLICA' })

    const establishmentList = await useEstablishmentStore.getEstablishments(filterParams)
    useEstablishmentStore.establishmentList = establishmentList.map((establishment) => ({ ...establishment, 'name': $lowerCaseName(establishment.name) }))

    if (form.value.establishment) {
      form.value.establishment = null
      establishmentReset.value = true
    }

    if (user.value.relationship) {
      const establishment = useEstablishmentStore.establishmentList.find((establishment) => establishment.cnes === user.value.relationship.cnes)
      form.value.establishment = establishment?.uuid
    }
  }
})

/* methods */
async function onSearchCPFDataCNES(inputElement) {
  let cpf = inputElement.target.value
  const cpfRegex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/g
  const isValidCPF = cpfRegex.test(cpf)

  if (isValidCPF) {
    showSpinner.value = true
    const response = await axios.get(`api/datacnes-user?filter:cpf=${cpf.replaceAll('.', '').replace('-', '')}`)
    showRegisterForm.value = true
    clearFields()

    if (response.status === 200) {
      user.value = response.data.user

      if (user.value) {
        form.value.name = $lowerCaseName(user.value.nome)

        // TODO CPF DE TESTE 00653412100
        if (user.value.vinculos) {
          user.value.relationship = user.value.vinculos.find((relationship) => relationship.tpSusNaoSus === 'S')

          if (user.value.relationship) {
            const state = useStateStore.stateList.find((state) => state.acronym === user.value.relationship.estado)
            const cbo = useCBOStore.cboList.find((cbo) => cbo.code === user.value.relationship.cbo)

            form.value.state = state.uuid
            form.value.cbo = cbo?.uuid
            showSpinner.value = false

            return
          }
        }
      }

      showSpinner.value = false

      return
    }

    user.value = null
    showSpinner.value = false

    return
  }

  user.value = null
  showRegisterForm.value = false
}

function clearFields() {
  user.value = null
  form.value.name = null
  form.value.sex = null
  form.value.email = null
  form.value.establishment = null
  form.value.city = null
  form.value.state = null
  form.value.password = null
  form.value.confirm_password = null
  form.value.cbo = null

  establishmentReset.value = true
  cityReset.value = true

  useEstablishmentStore.establishmentList = []
  useCityStore.cityList = []

  errors.value = null
}

async function onRegisterDone(response) {
  const status = (await response).status

  if (status === 422) {
    errors.value = null
    errors.value = (await response).errors

    return
  }
}
</script>

<style>

</style>