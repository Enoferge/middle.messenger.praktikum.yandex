import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';
import { Link } from '@/components';
import { PAGES } from '@/navigation/constants';

import template from './default.hbs?raw';
import './styles.scss';

export class DefaultLayout extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      children: {
        ...props.children,
        HomeLink: new Link({
          text: 'Back to Home',
          link: PAGES.HOME.link,
        }),
      },
    });
  }

  render(): string {
    return template;
  }
}
