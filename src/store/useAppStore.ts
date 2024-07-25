export const useAppStore = defineStore(
  'appStore',
  () => {
    const isLogin = ref(false);
    const appConfig = ref({
      // 是否展示导航页签
      showNavigationTab: true,
    });

    function init() {
      appConfig.value = {
        showNavigationTab: true,
      };
      isLogin.value = false;
    }

    return {
      isLogin,
      appConfig,
      init,
    };
  },
  {
    persist: {
      enabled: true, //Store中数据持久化生效
      strategies: [
        {
          key: 'appStore',
          storage: localStorage,
        },
      ],
    },
  },
);
