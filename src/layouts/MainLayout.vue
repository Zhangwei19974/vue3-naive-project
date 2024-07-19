<template>
  <div class="mainLayout-container">
    <n-layout class="mainLayout-container_layout">
      <n-layout-header bordered>
        <slot name="header"> </slot>
      </n-layout-header>
      <n-layout class="mainLayout-container_layout-content" has-sider>
        <n-layout-sider
          :collapsed-width="collapsedConfig.width"
          :collapsed="isCollapsed"
          bordered
          collapse-mode="width"
          :width="collapsedConfig.exportWidth"
          :show-trigger="collapsedConfig.showTrigger"
          @collapse="isCollapsed = true"
          @expand="isCollapsed = false"
        >
          <slot name="sider"></slot>
        </n-layout-sider>
        <n-layout-content>
          <slot></slot>
        </n-layout-content>
      </n-layout>
      <n-layout-footer bordered>
        <slot name="footer"></slot>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/store/useMenuStore';

const menuStore = useMenuStore();
const { isCollapsed, collapsedConfig } = storeToRefs(menuStore);
</script>

<style lang="scss" scoped>
.mainLayout-container {
  width: 100%;
  height: 100%;
  .mainLayout-container_layout {
    width: 100%;
    height: 100%;
    :deep(.n-layout-scroll-container) {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .mainLayout-container_layout-content {
      flex: 1;
    }
  }
}
</style>
