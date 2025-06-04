import { Link } from '@/components';
import { Block } from '@/core/block/block';

import template from './home.hbs?raw';
import type { HomePageProps } from './types';
import './home.scss';

export class HomePage extends Block<HomePageProps> {
  constructor(props: HomePageProps) {
    const links = props.pages
      ?.map(({ linkText, page }) => new Link({ link: page, text: linkText })) || [];

    super('nav', {
      ...props,
      class: 'home-nav',
      children: { Links: links },
    });
  }

  render() {
    return template;
  }
}
