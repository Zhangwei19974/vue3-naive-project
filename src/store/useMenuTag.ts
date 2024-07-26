import { router } from '@/router';
import { cloneDeep } from 'lodash-es';
export const useMenuTag = defineStore(
  'menuTag',
  () => {
    const menuTagList = computed(() => {
      console.log('menuTagListMap', menuTagListMap.value);

      return menuTagListMap.value[route.matched?.[1]?.path] || [];
    });

    const menuTagListMap = ref<Record<string, any[]>>({});

    const route = useRoute();
    const router = useRouter();
    // 添加菜单标签页
    const addMenuTag = (menuTag: any, fromTag?: any) => {
      // 过滤不显示的菜单
      const menuTagPath = menuTag.matched?.[1]?.path;
      if (!menuTagPath) {
        return;
      }
      if (!menuTagListMap.value[menuTagPath]) {
        menuTagListMap.value[menuTagPath] = [];
      }
      const menuTagListCache = menuTagListMap.value[menuTagPath];
      if (!menuTag.meta.title) {
        return;
      }
      let currentIndex = -1;
      const currentItem = menuTagListCache.find((item: any, index: number) => {
        if (item.path === menuTag.path) {
          currentIndex = index;
          return true;
        }
      });
      if (currentIndex !== -1) {
        return;
      }
      // 默认在列表后面添加
      let fromTagIndex = -1;
      if (fromTag) {
        const currentFromTag = menuTagListCache.find(
          (item: any, index: number) => {
            if (item.path === fromTag.path) {
              fromTagIndex = index;
              return true;
            }
          },
        );
      }
      if (menuTagListCache.length === 0 || fromTagIndex === -1) {
        menuTagListCache.push(menuTag);
        return;
      }
      // const menuTagListCache = cloneDeep(menuTagList.value);
      menuTagListCache.splice(fromTagIndex + 1, 0, menuTag);
      // menuTagList.value = menuTagListCache;
    };
    // 删除菜单标签页
    const delMenuTag = (menuTag?: any) => {
      const path = menuTag?.path || route.path;
      let currentIndex = -1;
      menuTagList.value.find((menuTagItem: any, index: number) => {
        if (menuTagItem.path === path) {
          currentIndex = index;
          return true;
        }
      });
      if (currentIndex !== -1) {
        const delTagItem = menuTagList.value.splice(currentIndex, 1);
        if (delTagItem[0]?.path === route.path) {
          router.go(-1);
        }
      }
    };
    // 删除右侧标签页
    const delRightMenuTag = (menuTag?: any) => {
      const deledList = menuTagList.value.splice(
        menuTagList.value.indexOf(menuTag) + 1,
      );
      if (deledList.find((delTag: any) => delTag.path === route.path)) {
        router.push(menuTagList.value[menuTagList.value.length - 1].path);
      }

      // menuTagList.value.splice(menuTagList.value.indexOf(menuTag) + 1);
    };

    function init() {
      menuTagListMap.value = {};
    }
    return {
      menuTagList,
      addMenuTag,
      delMenuTag,
      delRightMenuTag,
      menuTagListMap,
      init,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
