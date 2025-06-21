import { Block } from '@/core/block/block';

import './styles.scss';
import template from './link.hbs?raw';
import type { LinkProps } from './types';

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    const cleanLink = props.link?.startsWith('/') ? props.link : `/${props.link}`;

    super('a', {
      ...props,
      class: `link${props.class ? ` ${props.class}` : ''}`,
      attrs: {
        href: `#${cleanLink}`,
      },
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          window.router.go(cleanLink);
        },
      },
    });
  }

  render() {
    return template;
  }
}
