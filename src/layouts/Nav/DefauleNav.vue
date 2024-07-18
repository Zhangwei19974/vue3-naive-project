<template>
  <div class="default-nav">
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
      responsive
    />
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NIcon } from 'naive-ui';
import { BookOutline } from '@vicons/ionicons5';
import {
  BookQuestionMark20Filled,
  BookQuestionMark20Regular,
  Home16Filled,
  Home16Regular,
} from '@vicons/fluent';
function renderIcon(icon: Component) {
  console.log('Asdasd');

  return () => h(NIcon, null, { default: () => h(icon) });
}

const activeKey = ref('1');
const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: '1',
    icon: () => {
      return activeKey.value === '1'
        ? renderIcon(Home16Filled)()
        : renderIcon(Home16Regular)();
    },
  },
  {
    label: '关于',
    key: '2',
    icon: () => {
      return activeKey.value === '2'
        ? renderIcon(BookQuestionMark20Filled)()
        : renderIcon(BookQuestionMark20Regular)();
    },
  },
  // {
  //   label: '关于',
  //   key: '2',
  //   icon: 'UserOutlined',
  // },
  // {
  //   label: '联系我们',
  //   key: '3',
  //   icon: 'PhoneOutlined',
  // },
];
</script>

<style lang="scss" scoped>
.default-nav {
  // background-color: #bd4d4d;
}
</style>
