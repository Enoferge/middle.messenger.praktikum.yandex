import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';
import { Link } from '@/components';
import { PAGE_NAMES } from '@/navigation/constants';

import template from './default.hbs?raw';
import './styles.css';

export class DefaultLayout extends Block {
  constructor(props: Props) {
    super('fragment', {
      ...props,
      HomeLink: new Link({
        text: 'Back to Home',
        link: PAGE_NAMES.HOME,
      }),
    });
  }

  render(): string {
    return template;
  }
}
