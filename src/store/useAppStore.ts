export const useAppStore = defineStore(
  'appStore',
  () => {
    const isLogin = ref(false);
    const appConfig = ref({
      // 是否展示导航页签
      showNavigationTab: false,
    });

    return {
      isLogin,
      appConfig,
    };
  },
  {
    persist: {
      enabled: true, //Store中数据持久化生效
    },
  },
);
