import type { Block } from './block';

export type Element = HTMLElement;

export type Meta = {
  tagName: string;
  props: unknown;
};

export type Props = {
  [key: string | symbol]: unknown;
  events?: Record<string, (e: Event) => void>;
};

export type Children = Record<string | symbol, Block | Block[]>;
