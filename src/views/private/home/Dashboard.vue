<template>
  <div class="d-flex justify-content-between w-100">
    <div class="card rounded-3 shadow-sm" style="width: 18rem;">
      <div class="card-body d-flex flex-column align-items-center">
        <h2 class="card-title pricing-card-title text-muted fw-semibold">
          <v-autocounter ref='counter' :startAmount="0" :endAmount="500" :duration="1" :autoinit="true"/>
        </h2>

        <h6 class="d-flex mb-0 column-gap-2 fw-semibold text-muted">
          <fa class="text-muted" :icon="['fas', 'fa-user']"/>

          <div class="align-self-center">Usuários</div>
        </h6>
      </div>
    </div>

    <div class="card rounded-3 shadow-sm" style="width: 18rem;">
      <div class="card-body d-flex flex-column align-items-center">
        <h2 class="card-title pricing-card-title text-muted fw-semibold">
          <v-autocounter ref='counter' :startAmount="0" :endAmount="302" :duration="1" :autoinit="true"/>
        </h2>

        <h6 class="d-flex mb-0 column-gap-2 fw-semibold text-muted">
          <fa class="text-muted" :icon="['fas', 'fa-user-nurse']"/>

          <div class="align-self-center">Teleconsultorias</div>
        </h6>
      </div>
    </div>

    <div class="card rounded-3 shadow-sm" style="width: 18rem;">
      <div class="card-body d-flex flex-column align-items-center">
        <h2 class="card-title pricing-card-title text-muted fw-semibold">
          <v-autocounter ref="counter" :startAmount="0" :endAmount="10235" :duration="1" :autoinit="true" separator='.'/>
        </h2>

        <h6 class="d-flex mb-0 column-gap-2 fw-semibold text-muted">
          <fa class="text-muted" :icon="['fas', 'fa-display']"/>

          <div class="align-self-center">Web aulas</div>
        </h6>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO COLORIR OS COUNTERS CARD IDEIA => https://vuejsprojects.com/x-chart
</script>

<style></style>