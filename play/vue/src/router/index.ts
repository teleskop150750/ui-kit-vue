import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('../views/ButtonView.vue'),
    },
    {
      path: '/badge',
      name: 'badge',
      component: () => import('../views/BadgeView.vue'),
    },
    {
      path: '/input',
      name: 'input',
      component: () => import('../views/InputView.vue'),
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import('../views/RadioView.vue'),
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue'),
    },
    {
      path: '/scrollbar',
      name: 'scrollbar',
      component: () => import('../views/ScrollbarView.vue'),
    },
    {
      path: '/virtual',
      name: 'virtual',
      component: () => import('../views/VirtualView.vue'),
    },
    {
      path: '/pagination',
      name: 'pagination',
      component: () => import('../views/PaginationView.vue'),
    },
    {
      path: '/sync-scroll',
      name: 'sync-scroll',
      component: () => import('../views/SyncScrollView.vue'),
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableView.vue'),
    },
  ],
})

export default router
