<template>
  <div>
    asdasd

    <n-button @click="getFiles">点击</n-button>

    <n-cascader
      v-model:value="cascaderValue"
      :options="cascaderOptions"
      value-field="value"
      label-field="name"
      check-strategy="child"
    ></n-cascader>
  </div>
</template>

<script setup lang="ts">
import { set } from 'lodash-es';
import { CascaderOption, NCascader } from 'naive-ui';

const route = useRoute();

const cascaderValue = ref([]);
const cascaderOptions = computed(() => {
  let files = import.meta.glob('@/**/**.vue');
  let options = getCascaderOptions(Object.keys(files));
  console.log(options);

  return options;
});

function getCascaderOptions(paths: string[]): CascaderOption[] {
  let tree: CascaderOption[] = [];
  paths.forEach((path) => {
    const parts = path.split('/').filter(Boolean);
    let currentLevel = tree;
    let currentNode = null as any;

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        currentNode = existingNode;
      } else {
        if (!isLastPart) {
          let value = parts.slice(0, index + 1).join('/');
          currentNode = {
            value: value,
            name: part,
            children: [],
          };
        } else {
          currentNode = {
            value: parts.join('/'),
            name: part,
          };
        }
        currentLevel.push(currentNode);
      }

      if (!isLastPart) {
        currentLevel = currentNode.children;
      }
    });
  });

  return tree;
}
onMounted(() => {
  console.log(route.params, 'asdasdasd');
});

function getFiles() {
  console.log(import.meta.glob('@/**/**.vue'));
}
</script>

<style scoped></style>
