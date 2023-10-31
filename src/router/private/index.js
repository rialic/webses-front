import consultancy from '@/router/private/consultancy'
import webOnline from '@/router/private/web-online'

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
      webOnline,
      consultancy,
      {
        path: '/configuracoes',
        name: 'setting',
        component: () => import('@/views/private/home/Dashboard.vue'),
        meta: { guard: ['ADMIN', 'SETTING'], module: 'configurações' }
      }
    ]
  }
]