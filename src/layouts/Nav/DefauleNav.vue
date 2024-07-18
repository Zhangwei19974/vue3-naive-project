<template>
  <div class="default-nav">
    <n-menu
      :value="activeKeyComp"
      mode="horizontal"
      :options="menuOptions"
      responsive
      @update:value="menuUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NConfigProvider, NIcon } from 'naive-ui';
import {
  BookQuestionMark20Filled,
  BookQuestionMark20Regular,
  Home16Filled,
  Home16Regular,
} from '@vicons/fluent';

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const router = useRouter();
const route = useRoute();

const activeKeyComp = computed(() => {
  return route.matched[2]?.path || 'Asdasd';
});

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: '/main/dash',
    icon: () => {
      return activeKeyComp.value === '1'
        ? renderIcon(Home16Filled)()
        : renderIcon(Home16Regular)();
    },
  },
  {
    label: '关于',
    key: '/main/about',
    icon: () => {
      return activeKeyComp.value === '2'
        ? renderIcon(BookQuestionMark20Filled)()
        : renderIcon(BookQuestionMark20Regular)();
    },
  },
];

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
