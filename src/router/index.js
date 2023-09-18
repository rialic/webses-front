import { createRouter, createWebHistory }  from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'auth.login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'auth.register',
      component: () => import('@/views/auth/Register.vue')
    },
  ]
})