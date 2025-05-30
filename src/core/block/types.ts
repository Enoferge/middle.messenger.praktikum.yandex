import type { Block } from './block';

export type Element = HTMLElement;

export type Meta = {
  tagName: string;
  props: unknown;
};

export type Props = Record<string | symbol, unknown>;
export type Children = Record<string | symbol, Block | Block[]>;
