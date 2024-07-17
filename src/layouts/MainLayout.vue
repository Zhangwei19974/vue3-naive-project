<template>
  <div class="mainLayout-container">
    <n-layout class="mainLayout-container_layout">
      <n-layout-header> header asd</n-layout-header>
      <n-layout class="mainLayout-container_layout-content" has-sider>
        <n-layout-sider>silder </n-layout-sider>
        <n-layout-content
          >asd

          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
        </n-layout-content>
      </n-layout>
      <n-layout-footer> footer </n-layout-footer>
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
