export type Listeners = Record<string, Array<ListenerCallback>>;

export type ListenerCallback = (...args: any[]) => void;
