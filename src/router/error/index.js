export default [
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/error/404NotFound.vue')
  },
  {
    path: '/404',
    name: '404-not-found',
    component: () => import('@/views/error/404NotFound.vue')
  }
]