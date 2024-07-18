<template>
  <div class="mainLayout-container">
    <n-layout class="mainLayout-container_layout">
      <n-layout-header>
        <slot name="header"> </slot>
      </n-layout-header>
      <n-layout class="mainLayout-container_layout-content" has-sider>
        <n-layout-sider>
          <slot name="sider"></slot>
        </n-layout-sider>
        <n-layout-content>
          <slot></slot>
        </n-layout-content>
      </n-layout>
      <n-layout-footer>
        <slot name="footer"></slot>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts"></script>

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
