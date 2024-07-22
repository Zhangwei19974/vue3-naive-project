<template>
  <div class="MenuTags">
    <div v-for="item in menuTagList || []" :key="item.path">
      <n-dropdown placement="bottom-start">
        <n-tag
          :type="item.path === activeTag ? 'success' : 'default'"
          @click="() => clickTag(item)"
          @close="() => delMenuTag(item)"
          closable
        >
          {{ item?.meta?.title }}
        </n-tag>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuTag } from '@/store/useMenuTag';
import { NDropdown } from 'naive-ui';
import { RouteRecordRaw } from 'vue-router';

const menuTags = useMenuTag();
const { delMenuTag, delRightMenuTag } = menuTags;
const { menuTagList } = storeToRefs(menuTags);

const route = useRoute();
const router = useRouter();

const activeTag = computed(() => {
  return route.path;
});

function clickTag(item: RouteRecordRaw) {
  if (item.path === activeTag.value) {
    return;
  }
  router.push({
    path: item.path,
  });
}
</script>

<style lang="scss" scoped>
.MenuTags {
  display: flex;
}
</style>
