<template>
  <div>
    asdasd

    <n-button @click="getFiles">点击</n-button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
onMounted(() => {
  console.log(route.params, 'asdasdasd');
});

function getFiles() {
  console.log(import.meta.glob('@/**/**.vue'));
}
</script>

<style scoped></style>
