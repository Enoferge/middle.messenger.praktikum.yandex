import type { BlockClass } from '@/core/block/types';

import Route from './route';
import type { RouteInterface } from './types';

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

  use(pathname: string, blockClass: BlockClass) {
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
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
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
