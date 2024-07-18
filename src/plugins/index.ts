import { router } from '@/router';
import { createPinia } from 'pinia';
import { App } from 'vue';

const pinia = createPinia();

export function setupPlugin(app: App) {
  app.use(router);
  app.use(pinia);
}
