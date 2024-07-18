<template>
  <div>
    <main-layout>
      <template #header>
        <router-view name="header" v-slot="{ Component }">
          <component v-if="Component" :is="Component" />
          <div v-else>
            <defaule-nav></defaule-nav>
          </div>
        </router-view>
      </template>
      <template #sider
        ><router-view name="sider" v-slot="{ Component }">
          <component v-if="Component" :is="Component" />
          <div v-else>asdasda</div>
        </router-view></template
      >
      <template #footer>
        <router-view name="footer" v-slot="{ Component }">
          <component v-if="Component" :is="Component" />
          <div v-else>asdasda</div>
        </router-view>
      </template>
      <router-view></router-view>
    </main-layout>
  </div>
</template>

<script setup lang="ts">
import DefauleNav from '@/layouts/Nav/DefauleNav.vue';
import MainLayout from './../../layouts/MainLayout.vue';
</script>

<style scoped></style>
