import type { Listeners, ListenerCallback } from './types';

function checkEventExists(listeners: Listeners, event: string) {
  if (!listeners[event]) {
    throw new Error(`No event: ${event}`);
  }
}

export class EventBus {
  listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: ListenerCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: ListenerCallback) {
    checkEventExists(this.listeners, event);

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: Array<unknown>) {
    checkEventExists(this.listeners, event);

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
