<script setup lang="ts">
import {
  GlobalThemeOverrides,
  NConfigProvider,
  NLoadingBarProvider,
} from 'naive-ui';

const themeOverride: GlobalThemeOverrides = {
  // Menu: {
  //   itemColorActive: 'red',
  // },
};
</script>

<template>
  <n-config-provider :themeOverride="themeOverride" style="height: 100vh">
    <n-loading-bar-provider>
      <router-view></router-view>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
