<template>
  <div class="default-nav">
    <div class="app-icon">
      {{ collapsedConfig.exportWidth }}
    </div>
    <n-menu
      :value="activeKeyComp"
      mode="horizontal"
      :options="navComp"
      responsive
      @update:value="menuUpdate"
    />
    <!-- 设置按钮 -->
    <div class="nav-setting">
      <div
        class="nav-setting_item"
        v-for="config in settingConfig"
        :key="config.id"
      >
        <n-icon>
          <component :is="config.icon" />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NIcon } from 'naive-ui';
import { useMenuStore } from '@/store/useMenuStore';
import { User } from '@vicons/fa';

const menuStroe = useMenuStore();
const { collapsedConfig } = storeToRefs(menuStroe);
const { navComp } = storeToRefs(menuStroe);
const settingConfig = [
  {
    id: 'user',
    icon: User,
    optinos: [],
  },
];

const router = useRouter();
const route = useRoute();

const activeKeyComp = computed(() => {
  return route.matched[2]?.path;
});

function menuUpdate(key: string, data: MenuOption) {
  router.push(key);
}
</script>

<style lang="scss" scoped>
$nav-span: 10px;
.default-nav {
  // background-color: #bd4d4d;
  display: flex;
  .app-icon {
    width: v-bind('`${collapsedConfig.exportWidth}px`');
    flex-shrink: 0;
  }
  .n-menu {
    flex: 1;
  }
  .nav-setting {
    display: flex;
    align-items: center;
    padding: 0 $nav-span;
    gap: $nav-span;
  }
}
:deep(.n-menu-item-content--selected) {
  background-color: var(--n-item-icon-color-active-horizontal);
  .n-menu-item-content__icon {
    color: white !important;
  }
  .n-menu-item-content-header {
    color: white !important;
  }
}
</style>
