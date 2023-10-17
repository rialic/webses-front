import { createRouter, createWebHistory }  from 'vue-router'
import { user, authenticated, verified, attempt } from '@/auth'
import { empty } from '@/helper'

/* Routes */
import authRoutes from '@/router/auth'
import homeRoutes from '@/router/home'

export default (() => {
  const $empty = empty
  const router = createRouter({
    history: createWebHistory(),
    routes: Array.prototype.concat(authRoutes, homeRoutes)
  })

  router.beforeEach(async(to, from, next) => {
    const isAuthRoutes = to.name === 'auth.login' || to.name === 'auth.register' || to.name === 'auth.verify-email'

    await attempt()

    if ($empty(to.name) && !verified.value) {
      next({ name: 'auth.verify-email' })

      return
    }

    if ($empty(to.name) && (authenticated.value && verified.value)) {
      next({ name: 'home' })

      return
    }

    if (isAuthRoutes) {
      if (!$empty(user.value) && !verified.value && to.name !== 'auth.verify-email') {
        next({ name: 'auth.verify-email' })

        return
      }

      if (authenticated.value && verified.value) {
        next({ name: 'home' })

        return
      }

      if ($empty(user.value) && to.name === 'auth.verify-email') {
        next({ name: 'auth.login' })

        return
      }
    }

    // TODO USUÁRIO NÃO AUTENTICADO E NEM VERIFICADO TENTANDO ACESSAR ROTAS VERIFICAÇÃO E AUTENTICAÇÃO
    next()
  })

  return router
})()