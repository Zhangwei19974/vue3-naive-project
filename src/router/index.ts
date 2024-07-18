import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/App.vue'),
    redirect: '/main',
    children: [
      {
        path: '/main',
        // component: () => import('@/views/MainView/index.vue'),
        components: {
          default: () => import('@/views/MainView/index.vue'),
        },
        redirect: '/main/dash',
        children: [
          {
            path: '/main/dash',
            components: {
              default: () => import('@/views/MainView/DashView/index.vue'),
            },
          },
        ],
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
