export type ListenerCallback = (...args: unknown[]) => void;

export type Listeners = Record<string, Array<ListenerCallback>>;
