<template>
  <div>
    <n-button @click="login"> 登录 </n-button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from '@/store/useMenuStore';

const appStore = useAppStore();
const { hasAuth } = storeToRefs(appStore);
const menuStroe = useMenuStore();
const { initRouter } = menuStroe;
// const {} = storeToRefs(menuStroe);

const router = useRouter();

async function login() {
  console.log('login');
  hasAuth.value = true;
  await initRouter();
  router.push('/');
}
</script>

<style scoped></style>
