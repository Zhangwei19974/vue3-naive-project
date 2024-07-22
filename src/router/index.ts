import { Home16Filled, Home16Regular } from '@vicons/fluent';
import { createDiscreteApi } from 'naive-ui';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { mainRouter } from './children/mainRouter';
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from '@/store/useMenuStore';
import { isEmpty } from 'lodash-es';
import { useMenuTag } from '@/store/useMenuTag';

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

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  const { isLogin } = appStore;
  // 没有权限的路由拦截
  if (!isLogin && to.path !== '/login') {
    next('/login');
    return;
  }

  // 动态路由刷新时处理
  const menuStore = useMenuStore();
  const { initRouter } = menuStore;
  const { menuMap } = storeToRefs(menuStore);

  if (isEmpty(menuMap.value) && to.path !== '/login') {
    console.log(to);
    await initRouter();
    next(false);
    router.replace(to.fullPath);
    return false;
  }

  // 添加菜单导航

  const { addMenuTag } = useMenuTag();

  const canJump = true;
  if (canJump) {
    loadingBar.start();
    next();
    addMenuTag(to, from);
  }
  // loadingBar.finish();
});

router.afterEach((to, from) => {
  loadingBar.finish();
});
