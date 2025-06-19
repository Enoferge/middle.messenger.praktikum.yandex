import type Router from "./core/router/router";

declare global {
  interface Window {
    router: Router
  }
}
