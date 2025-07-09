import type { BlockClass, Props } from '@/core/block/types';

import Route from './route';
import type { RouteInterface } from './types';
import { ROUTER } from './constants';

class Router {
  /* eslint-disable no-use-before-define */
  private static __instance: Router;

  private routes: RouteInterface[] = [];

  history = window.history;

  _rootQuery: string;

  _currentRoute: RouteInterface | null = null;

  constructor(rootQuery: string) {
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }

    return Router.__instance;
  }

  use(pathname: string, blockClass: BlockClass<Props>) {
    const route = new Route(pathname, blockClass, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onhashchange = () => {
      this._onRoute(this._getCurrentPath());
    };

    this._onRoute(this._getCurrentPath());
  }

  _getCurrentPath() {
    const path = window.location.hash.replace(/^#/, '') || '/';
    return path;
  }

  _onRoute(pathname: string) {
    const { user } = window.store.getState();
    const isAuthPage = [ROUTER.signIn, ROUTER.signUp].includes(pathname as ROUTER);
    const isProtectedPage = !isAuthPage;

    // Route guard
    if (!user && isProtectedPage) {
      if (pathname !== ROUTER.signIn) {
        this.go(ROUTER.signIn);
      }
      return;
    }

    if (user && isAuthPage) {
      if (pathname !== ROUTER.messenger) {
        this.go(ROUTER.messenger);
      }
      return;
    }

    const route = this.getRoute(pathname);

    if (!route) {
      this.go(ROUTER.error404);
      return;
    }

    try {
      if (this._currentRoute && this._currentRoute !== route) {
        this._currentRoute.leave();
      }

      if (this._currentRoute !== route) {
        this._currentRoute = route;
        route.render();
      }
    } catch (e) {
      this.go(ROUTER.error400);
    }
  }

  go(pathname: string) {
    window.location.hash = pathname;
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((r) => r.match(pathname));

    if (!route) {
      return this.routes.find((r) => r.match('*'));
    }

    return route;
  }
}

export default Router;
