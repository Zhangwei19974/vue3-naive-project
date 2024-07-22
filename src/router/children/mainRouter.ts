import { enumIcon } from '@/utils/dataCenter';
import { RouteRecordRaw, RouterView } from 'vue-router';

export const mainRouter: RouteRecordRaw[] = [
  {
    path: '/front',
    name: 'front',
    redirect: '/main',
    meta: {
      title: '前台页面',
    },
    components: {
      default: () => import('@/views/MainView/index.vue'),
    },
    children: [
      {
        path: '/main',
        name: 'main',
        redirect: '/main/dataDash',
        components: {
          default: h(RouterView),
        },
        meta: {
          title: '主界面',
          icon: enumIcon.Home16Regular,
          fillIcon: enumIcon.Home16Filled,
          showInMenu: true,
        },
        children: [
          {
            path: '/main/dataDash',
            name: 'mainDataDash',
            components: {
              default: () => import('@/views/MainView/DataDashView/index.vue'),
            },
            meta: {
              title: '数据面板',
              showInMenu: true,
              icon: enumIcon.Home16Regular,
            },
          },
          {
            path: '/main/three',
            name: 'mainThree',
            components: {
              default: () => import('@/views/MainView/ThreeView/index.vue'),
            },
            meta: {
              title: 'three',
            },
          },
        ],
      },
    ],
  },

  {
    path: '/background',
    name: 'background',
    components: {
      default: () => import('@/views/MainView/index.vue'),
    },
    meta: {
      title: '后台页面',
      icon: enumIcon.Home16Regular,
      fillIcon: enumIcon.Home16Filled,
      showInMenu: true,
    },
    children: [],
  },
];
