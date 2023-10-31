export default {
  path: '/teleconsultoria',
  name: 'consultoria',
  component: () => import('@/views/private/consultancy/Teleconsultoria.vue'),
  meta: { guard: ['ADMIN', 'WEB.CONSULTANCY'], module: 'teleconsultoria' }
}