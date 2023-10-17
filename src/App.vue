<template>
  <template>
    <nprogress-container></nprogress-container>
  </template>

  <v-toaster></v-toaster>

  <div class="container h-100">
    <div class="row align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-6 col-xl-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>