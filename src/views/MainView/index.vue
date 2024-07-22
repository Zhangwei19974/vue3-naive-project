<template>
  <main-layout>
    <template #header>
      <router-view name="header" v-slot="{ Component }">
        <component v-if="Component" :is="Component" />
        <div v-else>
          <defaule-nav></defaule-nav>
        </div>
      </router-view>
    </template>
    <template #sider>
      <router-view name="sider" v-slot="{ Component }">
        <component v-if="Component" :is="Component" />
        <default-sider v-else></default-sider>
      </router-view>
    </template>
    <template #footer>
      <router-view name="footer" v-slot="{ Component }">
        <component v-if="Component" :is="Component" />
        <div v-else>asdasda</div>
      </router-view>
    </template>
    <div class="main-content">
      <!-- 导航面包屑 -->
      <div class="main-content_header" v-if="appConfig.showNavigationTab">
        <n-breadcrumb>
          <n-breadcrumb-item
            v-for="breadcrumb in breadcrumbList"
            :key="breadcrumb.path"
          >
            {{ breadcrumb.meta.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
      <!-- 路由标签页 -->
      <menu-tags></menu-tags>
      <router-view></router-view>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import DefauleNav from '@/layouts/Nav/DefauleNav.vue';
import MainLayout from './../../layouts/MainLayout.vue';
import DefaultSider from '@/layouts/Nav/DefaultSider.vue';
import { useAppStore } from '@/store/useAppStore';
import MenuTags from '@/layouts/MenuTags/index.vue';
import { Backpack16Filled } from '@vicons/fluent';

const appStore = useAppStore();
const { appConfig } = storeToRefs(appStore);
const route = useRoute();

const breadcrumbList = computed(() => {
  return route.matched.slice(2);
});
</script>

<style lang="scss" scoped>
.main-content {
}
</style>
