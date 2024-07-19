<template>
  <div>
    <n-button @click="login"> 登录 </n-button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from '@/store/useMenuStore';

const appStore = useAppStore();
const { isLogin } = storeToRefs(appStore);
const menuStroe = useMenuStore();
const { initRouter } = menuStroe;
// const {} = storeToRefs(menuStroe);

const router = useRouter();

async function login() {
  console.log('login');
  isLogin.value = true;
  await initRouter();
  router.push('/');
}
</script>

<style scoped></style>
