import { Block } from '@/core/block/block';
import { withRouter } from '@/core/hoc/with-router';
import type { WithRouter } from '@/core/hoc/with-router';
import type Router from '@/navigation/router';

import type { LinkProps } from './types';
import './styles.scss';
import template from './link.hbs?raw';

class LinkBase extends Block<LinkProps> {
  private router!: Router;

  constructor(props: LinkProps & Partial<WithRouter>) {
    const cleanLink = props.link?.startsWith('/') ? props.link : `/${props.link}`;

    super('a', {
      ...props,
      class: `link${props.class ? ` ${props.class}` : ''}`,
      attrs: {
        href: cleanLink,
      },
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          this.router?.go(cleanLink);
        },
      },
    });
  }

  render() {
    return template;
  }
}

export const Link = withRouter(LinkBase);
