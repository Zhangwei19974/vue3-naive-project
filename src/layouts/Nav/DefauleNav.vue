<template>
  <div class="default-nav">
    <n-menu
      :value="activeKeyComp"
      mode="horizontal"
      :options="menuOptionsComp"
      responsive
      @update:value="menuUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NIcon } from 'naive-ui';
import { useMenuStore } from '@/store/useMenuStore';
import { constIcons } from '@/utils/dataCenter';

const menuStroe = useMenuStore();
const { mainMenuListComp } = storeToRefs(menuStroe);

const router = useRouter();
const route = useRoute();

const activeKeyComp = computed(() => {
  return route.matched[1]?.path;
});

const menuOptionsComp = computed(() => {
  return mainMenuListComp.value
    .filter((e) => e.meta?.showInMenu !== false)
    .map((menu) => {
      return {
        label: menu.meta?.title,
        key: menu.path,
        icon: () => {
          return h(NIcon, null, {
            default: () => {
              if (activeKeyComp.value === menu.path && menu.meta?.fillIcon) {
                return h(constIcons[menu.meta.fillIcon]);
              }
              return h(constIcons[menu.meta!.icon!]);
            },
          });
        },
      };
    });
});

function menuUpdate(key: string, data: MenuOption) {
  router.push(key);
}
</script>

<style lang="scss" scoped>
.default-nav {
  // background-color: #bd4d4d;
}
:deep(.n-menu-item-content--selected) {
  background-color: var(--n-item-icon-color-active-horizontal);
  .n-menu-item-content__icon {
    color: white !important;
  }
  .n-menu-item-content-header {
    color: white !important;
  }
}
</style>
