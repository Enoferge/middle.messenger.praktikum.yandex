// we use any here because the store is a global registry for all app state, and its shape is dynamic
export type State = Record<string, any>
