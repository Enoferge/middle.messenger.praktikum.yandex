import { DefaultLayout } from '@/layouts/default';

import { Block } from '../block/block';
import { withRouter } from '../hoc/with-router';
import type { BlockClass, Props } from '../block/types';

export abstract class BasePageWithLayout<TProps extends Props = Props> extends Block {
  constructor(
    PageBlock: BlockClass<TProps>,
    pageProps: TProps,
    layoutProps?: { hideHomeButton?: boolean },
  ) {
    const WrappedPageBlock = withRouter(PageBlock);
    const layout = new DefaultLayout({
      ...layoutProps,
      children: {
        PageContent: new WrappedPageBlock(pageProps),
      },
    });

    super('div', {
      children: {
        layout,
      },
    });
  }

  render() {
    return '{{{layout}}}';
  }
}
