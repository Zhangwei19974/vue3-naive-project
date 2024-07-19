export const useAppStore = defineStore('appStore', () => {
  const hasAuth = ref(false);
  return { hasAuth };
});
