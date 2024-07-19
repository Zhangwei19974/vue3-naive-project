<template>
  <div>
    <n-menu
      :value="activeKeyComp"
      :collapsed="isCollapsed"
      :collapsed-width="collapsedConfig.width"
      :collapsed-icon-size="collapsedConfig.iconSize"
      :options="siderNavComp"
      @update:value="menuUpdate"
    ></n-menu>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/store/useMenuStore';
import { MenuOption, NIcon } from 'naive-ui';

const menuStore = useMenuStore();
const route = useRoute();
const router = useRouter();

const { isCollapsed, collapsedConfig, siderNavComp } = storeToRefs(menuStore);

const activeKeyComp = computed(() => {
  return route.matched[3]?.path;
});

function menuUpdate(key: string, data: MenuOption) {
  router.push(key);
}
</script>

<style scoped></style>
