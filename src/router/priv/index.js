export default [
  {
    path: '',
    name: '',
    component: () => import('@/views/private/Main.vue'),
    meta: { guard: ['ADMIN', 'MAIN'] },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/private/home/Dashboard.vue'),
        meta: { guard: ['ADMIN', 'HOME'], module: 'dashboard' }
      },
      {
        path: '/web',
        name: 'web',
        component: () => import('@/views/private/home/Dashboard.vue'),
        meta: { guard: ['ADMIN', 'WEB.MENU'], module: 'web online' }
      },
      {
        path: '/teleconsultoria',
        name: 'consultoria',
        component: () => import('@/views/private/teleconsultoria/Teleconsultoria.vue'),
        meta: { guard: ['ADMIN', 'WEB.MENU'], module: 'teleconsultoria' }
      },
    ]
  }
]