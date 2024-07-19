<template>
  <div class="default-nav">
    <n-menu
      :value="activeKeyComp"
      mode="horizontal"
      :options="navComp"
      responsive
      @update:value="menuUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NIcon } from 'naive-ui';
import { useMenuStore } from '@/store/useMenuStore';

const menuStroe = useMenuStore();
const { navComp } = storeToRefs(menuStroe);

const router = useRouter();
const route = useRoute();

const activeKeyComp = computed(() => {
  return route.matched[2]?.path;
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
