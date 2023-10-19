export default [
  {
    path: '',
    name: '',
    component: () => import('@/views/private/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/private/home/Dashboard.vue'),
        meta: { guard: ['HOME'] }
      }
    ]
  }
]