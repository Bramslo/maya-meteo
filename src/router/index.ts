import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue')
    },
    {
      path: '/advanced',
      name: 'advanced',
      component: () => import('@/views/AdvancedView.vue')
    },
    {
      path: '/extra',
      name: 'extra',
      component: () => import('@/views/ExtraView.vue')
    }
  ]
})

export default router
