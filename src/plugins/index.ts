import { router } from '@/router';
import { createPinia } from 'pinia';
import { App } from 'vue';

import piniaPersist from 'pinia-plugin-persist';

const pinia = createPinia();
pinia.use(piniaPersist);

export function setupPlugin(app: App) {
  app.use(pinia);

  // const {} = useMenuStore();
  app.use(router);
}
