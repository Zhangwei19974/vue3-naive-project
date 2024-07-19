import { Home16Filled, Home16Regular } from '@vicons/fluent';
import { createDiscreteApi } from 'naive-ui';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { mainRouter } from './children/mainRouter';
import { useAppStore } from '@/store/useAppStore';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'app',
    component: () => import('@/App.vue'),
    redirect: '/main',
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView/index.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('@/views/ErrorView/index.vue'),
    meta: {
      title: '访问的页面不存在',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
const { loadingBar } = createDiscreteApi(['loadingBar']);

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  const { hasAuth } = appStore;
  // 没有权限的路由拦截
  if (!hasAuth && to.path !== '/login') {
    next('/login');
    return;
  }
  const canJump = true;
  if (canJump) {
    loadingBar.start();
    const res = next();
  }
  // loadingBar.finish();
});

router.afterEach((to, from) => {
  loadingBar.finish();
});
