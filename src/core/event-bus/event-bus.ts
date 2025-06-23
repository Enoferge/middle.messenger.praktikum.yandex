import type { Listeners, ListenerCallback } from './types';

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
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event]?.filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: Array<unknown>) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
