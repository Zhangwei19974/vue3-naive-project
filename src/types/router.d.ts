import { enumIcon } from '@/utils/dataCenter';
import 'vue-router';

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export {};

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title: string;
    // 每个路由都必须声明
    icon?: enumIcon;
    fillIcon?: enumIcon;
    showInMenu?: boolean;
  }
}

declare module 'pinia-plugin-persist';
