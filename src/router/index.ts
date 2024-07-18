import { createDiscreteApi } from 'naive-ui';
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
          {
            path: '/main/about',
            components: {
              default: () => import('@/views/MainView/AboutView/index.vue'),
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
const { loadingBar } = createDiscreteApi(['loadingBar']);

router.beforeEach((to, from, next) => {
  loadingBar.start();
  next();
  loadingBar.finish();
});

// router.afterEach((to, from) => {
//   loadingBar.finish();
// });
