import { Block } from '@/core/block/block';

import './styles.scss';
import template from './link.hbs?raw';
import type { LinkProps } from './types';

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', {
      ...props,
      class: `link${props.class ? ` ${props.class}` : ''}`,
      attrs: {
        href: `/${props.link}`,
      },
    });
  }

  render() {
    return template;
  }
}
