import { EventBus } from '../event-bus/event-bus';

import type { State } from './types';

export enum StoreEvents {
  Updated = 'Updated',
}

export class Store extends EventBus {
  /* eslint-disable no-use-before-define */
  private static __instance: Store;

  private state: State = {};

  private defaultState: State = {};

  constructor(defaultState: State) {
    super();

    this.defaultState = defaultState;
    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  static getInstance(defaultState: State): Store {
    if (!Store.__instance) {
      Store.__instance = new Store(defaultState);
    }

    return Store.__instance;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: State) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }

  public clearState() {
    this.set(this.defaultState);
  }
}
