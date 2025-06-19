import { Link } from '@/components';
import { Block } from '@/core/block/block';
import { PAGES } from '@/navigation/constants';

import template from './home.hbs?raw';
import type { HomePageProps } from './types';
import './home.scss';

export class HomePageBase extends Block<HomePageProps> {
  constructor() {
    const currentPages = Object.values(PAGES).map(({ name, link }) => ({
      link,
      linkText: `Page ${name}`,
    }));

    const links = currentPages
      ?.map(({ linkText, link }) => new Link({ link, text: linkText })) || [];

    super('nav', {
      class: 'home-nav',
      children: { Links: links },
    });
  }

  render() {
    return template;
  }
}
