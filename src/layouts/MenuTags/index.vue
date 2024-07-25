<template>
  <div class="MenuTags">
    <div
      v-for="item in menuTagList || []"
      :key="item.path"
      @contextmenu="(e) => handleContextmenu(e, item)"
    >
      <n-tag
        :type="item.path === activeTag ? 'success' : 'default'"
        @click="() => clickTag(item)"
        @close="() => delMenuTag(item)"
        closable
      >
        {{ item?.meta?.title }}
      </n-tag>
      <div class="MenuTags_line"></div>
    </div>
  </div>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :options="rightMenuOptions"
    :x="rightMenuConfig.x"
    :y="rightMenuConfig.y"
    :show="rightMenuConfig.show"
    @clickoutside="() => (rightMenuConfig.show = false)"
    @select="handleRightSelect"
  >
    <div></div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { useMenuTag } from '@/store/useMenuTag';
import { NDropdown, useThemeVars } from 'naive-ui';
import { RouteRecordRaw } from 'vue-router';

const menuTags = useMenuTag();
const { delMenuTag, delRightMenuTag } = menuTags;
const { menuTagList } = storeToRefs(menuTags);

const route = useRoute();
const router = useRouter();

const theme = useThemeVars();

const activeTag = computed(() => {
  return route.path;
});
const rightClickItem = ref();

const rightMenuConfig = reactive({
  show: false,
  x: 0,
  y: 0,
});
const rightMenuOptions = reactive([
  {
    label: '关闭',
    key: 'closeCurrent',
  },
  {
    label: '关闭右侧',
    key: 'closeRight',
  },
]);

function clickTag(item: RouteRecordRaw) {
  if (item.path === activeTag.value) {
    return;
  }
  router.push({
    path: item.path,
  });
}

function handleRightSelect(data: string) {
  let rightSelectMapFun = {
    closeRight: () => {
      delRightMenuTag(rightClickItem.value);
    },
    closeCurrent: () => {
      delMenuTag(rightClickItem.value);
    },
  };
  rightSelectMapFun[data as keyof typeof rightSelectMapFun]();
  rightMenuConfig.show = false;
}

function handleContextmenu(e: MouseEvent, item: any) {
  e.preventDefault();

  rightClickItem.value = item;
  rightMenuConfig.show = true;
  rightMenuConfig.x = e.clientX;
  rightMenuConfig.y = e.clientY;
}
</script>

<style lang="scss" scoped>
.MenuTags {
  display: flex;
  border-bottom: 1px solid v-bind('theme.borderColor');
}
</style>
