import type { Block } from './block';

export type Element = HTMLElement;
export type Children = Record<string, Block | Block[]>;

export interface RawProps {
  [key: string | symbol]: unknown;
  class?: string;
}

export interface RawPropsWithChildren extends RawProps {
  children?: Children;
}

export interface Props extends RawPropsWithChildren {
  events?: Record<string, (e: Event) => void>;
  attrs?: Record<string, unknown>;
}

export type Meta = {
  tagName: string;
  props: Props;
};

export type BlockClass<TProps extends Props> = new (props?: TProps) => Block<TProps>
