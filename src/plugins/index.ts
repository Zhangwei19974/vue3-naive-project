import { router } from '@/router';
import { App } from 'vue';

export function setupPlugin(app: App) {
  app.use(router);
}
