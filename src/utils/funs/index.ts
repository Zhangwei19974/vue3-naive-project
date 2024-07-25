import { useAppStore } from '@/store/useAppStore';
import { useMenuTag } from '@/store/useMenuTag';

const { init: initAppStore } = useAppStore();
const { init } = useMenuTag();

export function initStore() {
  init();
  initAppStore();
}
