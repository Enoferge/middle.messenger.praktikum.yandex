import type Router from './core/router/router';
import type Store from './core/store/store';

declare global {
  interface Window {
    router: Router
    store: Store
  }
}
