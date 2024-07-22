import { router } from '@/router';
import { cloneDeep } from 'lodash-es';
export const useMenuTag = defineStore(
  'menuTag',
  () => {
    const menuTagList = ref<any>([]);

    const route = useRoute();
    const router = useRouter();
    // 添加菜单标签页
    const addMenuTag = (menuTag: any, fromTag?: any) => {
      let currentIndex = -1;
      const currentItem = menuTagList.value.find((item: any, index: number) => {
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
        const currentFromTag = menuTagList.value.find(
          (item: any, index: number) => {
            if (item.path === fromTag.path) {
              fromTagIndex = index;
              return true;
            }
          },
        );
      }
      if (menuTagList.value.length === 0 || fromTagIndex === -1) {
        menuTagList.value.push(menuTag);
        return;
      }
      const menuTagListCache = cloneDeep(menuTagList.value);
      menuTagListCache.splice(fromTagIndex + 1, 0, menuTag);
      menuTagList.value = menuTagListCache;
    };
    // 删除菜单标签页
    const delMenuTag = (menuTag: any) => {
      const path = menuTag.path;
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
    const delRightMenuTag = (menuTag: any) => {
      // menuTagList.value.splice(menuTagList.value.indexOf(menuTag) + 1);
    };
    return { menuTagList, addMenuTag, delMenuTag, delRightMenuTag };
  },
  {
    persist: {
      enabled: true, //Store中数据持久化生效
    },
  },
);
