export default [
  {
    path: '/',
    name: 'auth',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'auth.register',
    component: () => import('@/views/auth/Register.vue')
  },
  {
    path: '/verify-email',
    name: 'auth.verify-email',
    component: () => import('@/views/auth/VerifyEmail.vue')
  },
]