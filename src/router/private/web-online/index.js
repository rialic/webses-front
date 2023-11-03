import { pageParams } from '@/router/helper'

export default {
  path: '',
  name: 'webonline',
  meta: { guard: ['ADMIN', 'WEB.MENU'], module: 'web online' },
  children: [
    {
      path: 'web-aulas',
      name: 'webonline.webclass',
      redirect: () => ({ name: 'webclass.participate' }),
      meta: { guard: ['ADMIN', 'WEB.EVENT'], submodule: 'web aulas' },
      children: [
        {
          path: '/web-aulas',
          name: 'webclass',
          component: () => import('@/views/private/web-online/webclass/WebclassList.vue'),
          props: (route) => pageParams(route),
          meta: { guard: ['ADMIN', 'WEB.EVENT--VIEW'], pagRouteName: 'webclass' }
        },
        {
          path: '/web-aulas/criar',
          name: 'webclass.create',
          component: () => import('@/views/private/web-online/webclass/WebclassCreate.vue'),
          meta: { guard: ['ADMIN', 'WEB.EVENT--CREATE'] }
        },
        {
          path: '/web-aulas/:uuid/editar',
          name: 'webclass.edit',
          component: () => import('@/views/private/web-online/webclass/WebclassEdit.vue'),
          props: (route) => pageParams(route),
          meta: { guard: ['ADMIN', 'WEB.EVENT--EDIT'] }
        },
        {
          path: 'participe',
          name: 'webclass.participate',
          component: () => import('@/views/private/web-online/webclass/Participate.vue'),
        },
        {
          path: 'certificados',
          name: 'webclass.certificate',
          component: () => import('@/views/private/web-online/webclass/Certificate.vue'),
        }
      ]
    },
    {
      path: 'cursos',
      name: 'webonline.course',
      component: () => import('@/views/private/web-online/courses/Course.vue'),
      meta: { guard: ['ADMIN', 'WEB.COURSE'], submodule: 'cursos' },
    }
  ]
}