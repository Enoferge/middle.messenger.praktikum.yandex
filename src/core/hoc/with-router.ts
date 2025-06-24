import type { Props, BlockClass } from '@/core/block/types';
import type Router from '@/navigation/router';

import type { Block } from '../block/block';

export interface WithRouter {
  router: Router
}

export function withRouter<
  TProps extends Props>(WrappedBlock: BlockClass<TProps>):
    new (props?: TProps) => Block<TProps> & WithRouter {
  return class extends WrappedBlock {
    router: Router = window.router;
  };
}
