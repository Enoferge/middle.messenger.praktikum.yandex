import { Block } from '@/core/block/block';
import type { RawPropsWithChildren } from '@/core/block/types';
import { Link } from '@/components';
import { PAGE_NAMES } from '@/navigation/constants';

import template from './default.hbs?raw';
import './styles.css';

export class DefaultLayout extends Block {
  constructor(props: RawPropsWithChildren) {
    super('div', {
      ...props,
      children: {
        ...props.children,
        HomeLink: new Link({
          text: 'Back to Home',
          link: PAGE_NAMES.HOME,
        }),
      },
    });
  }

  render(): string {
    return template;
  }
}
