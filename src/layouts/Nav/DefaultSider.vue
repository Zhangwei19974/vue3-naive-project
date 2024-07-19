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
import { constIcons } from '@/utils/dataCenter';
import { MenuOption, NIcon } from 'naive-ui';

const menuStore = useMenuStore();
const route = useRoute();
const router = useRouter();

const { mainMenuListComp, isCollapsed, collapsedConfig } =
  storeToRefs(menuStore);

const activeKeyComp = computed(() => {
  return route.matched[2]?.path;
});

const siderNavComp = computed(() => {
  return mainMenuListComp.value
    .find((menu) => menu.path === route.matched[1]?.path)
    ?.children?.map((menu) => {
      return {
        label: menu.meta?.title,
        key: menu.path,
        icon: () => {
          return h(NIcon, null, {
            default: () => {
              if (activeKeyComp.value === menu.path && menu.meta?.fillIcon) {
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
function menuUpdate(key: string, data: MenuOption) {
  router.push(key);
}
</script>

<style scoped></style>
