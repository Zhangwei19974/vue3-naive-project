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
  common: {
    baseColor: 'red',
  },
};
</script>

<template>
  <n-config-provider :themeOverride="themeOverride" style="height: 100vh">
    <n-loading-bar-provider>
      <n-layout style="height: 100vh; width: 100vw">
        <router-view></router-view>
      </n-layout>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="scss" scoped></style>
