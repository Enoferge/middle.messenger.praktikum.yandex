import type { Props as BlockProps } from '@/core/block/types';

export interface RouteInterface {
  render: () => void;
  match: (path: string) => boolean;
  leave: () => void;
}

export interface RouteProps extends BlockProps {
  rootQuery: string
}
