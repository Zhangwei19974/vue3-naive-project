import { enumIcon } from '@/utils/dataCenter';
import { Home16Filled, Home16Regular } from '@vicons/fluent';
import { RouteRecordRaw } from 'vue-router';

export const mainRouter: RouteRecordRaw[] = [
  {
    path: '/main',
    name: 'main',
    components: {
      default: () => import('@/views/MainView/index.vue'),
    },
    redirect: '/main/dataDash',
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
];
