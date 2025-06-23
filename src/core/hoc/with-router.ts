import type { Props, BlockClass } from '@/core/block/types';
import type Router from '@/navigation/router';

export function withRouter<
  TProps extends Props>(WrappedBlock: BlockClass<TProps>) {
  return class extends WrappedBlock {
    router: Router = window.router;

    // constructor(props: TProps) {
    //   super(props);

    //   this.router = window.router as Router;
    // }
  };
}

export interface WithRouter {
  router: Router
}
