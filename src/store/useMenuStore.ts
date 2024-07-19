import { mainRouter } from './../router/children/mainRouter';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { cloneDeep } from 'lodash-es';

export const useMenuStore = defineStore('menuStore', () => {
  const router = useRouter();
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
  };
});
