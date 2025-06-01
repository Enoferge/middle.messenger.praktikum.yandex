import type { Block } from './block';

export type Element = HTMLElement;

export type Meta = {
  tagName: string;
  props: Props;
};

export interface Props extends RawProps {
  class?: string;
  events?: Record<string, (e: Event) => void>;
  attrs?: Record<string, unknown>;
}

export type RawProps = Record<string | symbol, unknown>;
export interface RawPropsWithChildren extends RawProps {
  children?: Children;
}

export type Children = Record<string, Block | Block[]>;
