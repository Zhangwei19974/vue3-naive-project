export const useAppStore = defineStore(
  'appStore',
  () => {
    const hasAuth = ref(false);
    const appConfig = ref({
      // 是否展示导航页签
      showNavigationTab: true,
    });

    return {
      hasAuth,
      appConfig,
    };
  },
  {
    persist: {
      enabled: true, //Store中数据持久化生效
    },
  },
);
