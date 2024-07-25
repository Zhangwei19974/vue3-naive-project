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
      <div v-for="config in settingConfig" :key="config.id">
        <n-dropdown :options="config.options" @select="clickSetting">
          <div class="nav-setting_item">
            <n-icon size="14">
              <component :is="config.icon" />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NIcon, useThemeVars } from 'naive-ui';
import { useMenuStore } from '@/store/useMenuStore';
import { User } from '@vicons/fa';
import { Settings28Filled } from '@vicons/fluent';
import { initStore } from '@/utils/funs';

const menuStroe = useMenuStore();
const { collapsedConfig } = storeToRefs(menuStroe);
const { navComp } = storeToRefs(menuStroe);
const themeVars = useThemeVars();
const settingConfig = [
  {
    id: 'user',
    icon: User,
    options: [],
  },
  {
    id: 'setting',
    icon: Settings28Filled,
    options: [
      { label: '设置', key: 'setting' },
      { label: '退出', key: 'exit' },
    ],
  },
];

const router = useRouter();
const route = useRoute();

const activeKeyComp = computed(() => {
  return route.matched[2]?.path;
});

function clickSetting(key: string) {
  console.log(key);
  const settingFunMap = {
    setting: () => {
      console.log(':setting');
      router.push({
        path: '/background',
      });
    },
    exit: () => {
      initStore();
      router.push({
        path: '/',
      });
    },
  };
  settingFunMap[key as keyof typeof settingFunMap]?.();
}

function menuUpdate(key: string, data: MenuOption) {
  router.push(key);
}
</script>

<style lang="scss" scoped>
$nav-span: 10px;
$setting-icon-size: 30px;
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
    .nav-setting_item {
      width: $setting-icon-size;
      height: $setting-icon-size;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: v-bind('themeVars.buttonColor2Hover');
      }
    }
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
