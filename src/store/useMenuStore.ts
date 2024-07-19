import { mainRouter } from './../router/children/mainRouter';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { MenuOption, NIcon } from 'naive-ui';
import { constIcons } from '@/utils/dataCenter';

export const useMenuStore = defineStore('menuStore', () => {
  const router = useRouter();
  const route = useRoute();
  // 是否收起菜单
  const isCollapsed = ref(false);
  const collapsedConfig = ref({
    width: 64,
    iconSize: 20,
    showTrigger: true,
    exportWidth: 200,
  });
  // 主项目路由
  const menuMap = ref<Record<string, RouteRecordRaw & { pName?: string }>>({});
  // 将静态路由和动态路由转化为树形结构
  const mainMenuListComp = computed(() => {
    const tree: RouteRecordRaw[] = [];
    Object.keys(menuMap.value).forEach((key) => {
      const element = menuMap.value[key];
      const pName = element?.pName || '';
      if (menuMap.value[pName]) {
        menuMap.value[pName]?.children?.push(element);
      } else {
        tree.push(element);
      }
    });
    return tree;
  });
  // 选中的模块路由数据
  const activeModule = computed(() => {
    return (
      mainMenuListComp.value.find((menu) => menu.path === route.matched[1].path)
        ?.children || []
    );
  });

  // 选中的模块头部导航数据
  const navComp = computed(() => {
    return activeModule.value
      .filter((e) => e.meta?.showInMenu !== false)
      .map((menu) => {
        return {
          label: menu.meta?.title,
          key: menu.path,
          icon: () => {
            return h(NIcon, null, {
              default: () => {
                if (
                  route.matched[2].path === menu.path &&
                  menu.meta?.fillIcon
                ) {
                  return h(constIcons[menu.meta.fillIcon]);
                }
                if (menu.meta?.icon) {
                  return h(constIcons[menu.meta.icon]);
                }
              },
            });
          },
        };
      });
  });
  // 侧边导航栏数据
  const siderNavComp = computed(() => {
    return (
      activeModule.value.find((menu) => menu.path === route.matched[2].path)
        ?.children || []
    )
      .filter((e) => e.meta?.showInMenu !== false)
      .map((menu) => {
        return {
          label: menu.meta?.title,
          key: menu.path,
          icon: () => {
            return h(NIcon, null, {
              default: () => {
                if (
                  route.matched[3].path === menu.path &&
                  menu.meta?.fillIcon
                ) {
                  return h(constIcons[menu.meta.fillIcon]);
                }
                if (menu.meta?.icon) {
                  return h(constIcons[menu.meta.icon]);
                }
              },
            });
          },
        };
      }) as MenuOption[];
  });

  async function initRouter() {
    await initMainMenuRouter();
  }
  function initMainMenuRouter(): RouteRecordRaw[] {
    // 添加静态路由
    const staticRouter = mainRouter;
    addRouteWithTree(
      'app',
      staticRouter,
      (parentName: string, item: RouteRecordRaw) => {
        const dataCache = cloneDeep(item);
        if (item.name) {
          menuMap.value[item.name as string] = {
            ...dataCache,
            pName: parentName,
            children: [],
          };
        }
      },
    );

    return mainRouter;
  }

  function addRouteWithTree(
    parentName: string,
    treeRouterList: RouteRecordRaw[],
    treeItemCallBack?: (parentName: string, item: RouteRecordRaw) => void,
  ) {
    treeRouterList.forEach((item) => {
      router.addRoute(parentName, item);
      treeItemCallBack?.(parentName, item);
      if (item.children) {
        addRouteWithTree(item.name as string, item.children, treeItemCallBack);
      }
    });
  }

  return {
    initRouter,
    mainMenuListComp,
    isCollapsed,
    collapsedConfig,
    activeModule,
    siderNavComp,
    navComp,
    menuMap,
  };
});
