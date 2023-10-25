import { createRouter, createWebHistory }  from 'vue-router'
import { user, authenticated, verified, attempt } from '@/auth'
import { empty } from '@/helper'

/* Routes */
import authRoutes from '@/router/auth'
import privRoutes from '@/router/priv'
import errorRoutes from '@/router/error'

export default (() => {
  const $empty = empty
  const router = createRouter({
    history: createWebHistory(),
    routes: Array.prototype.concat(authRoutes, privRoutes, errorRoutes)
  })

  router.beforeEach(async(to, from, next) => {
    await attempt()

    const isAuthRoutes = to.name === 'auth' || to.name === 'auth.login' || to.name === 'auth.register' || to.name === 'auth.verify-email'
    const isGuardRoutes = to.meta.guard?.length
    const isErrorRoutes = to.name === 'not-found' || to.name === '404-not-found'
    const userEmailIsVerified = verified.value
    const userIsAuthenticated = (authenticated.value && userEmailIsVerified)

    if (userIsAuthenticated) {
      const guards = to.meta.guard
      const canPass = user.value.abilities.find((ability) => guards?.includes(ability))

      if (isAuthRoutes) {
        return next({ name: 'home' })
      }

      if (canPass || isErrorRoutes) {
        return next()
      }

      return next({ name: '404-not-found' })
    }else {
      if (isGuardRoutes) {
        return next({ name: 'auth.login' })
      }

      if (!$empty(user.value) && !userEmailIsVerified && to.name !== 'auth.verify-email') {
        return next({ name: 'auth.verify-email' })
      }

      if ($empty(user.value) && to.name === 'auth.verify-email') {
        return next({ name: 'auth.login' })
      }
    }

    next()
  })

  return router
})()