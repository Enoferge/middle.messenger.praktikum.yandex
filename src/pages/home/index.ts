import { Link } from '@/components';
import { Block } from '@/core/block/block';
import { PAGE_NAMES } from '@/navigation/constants';

import template from './home.hbs?raw';
import type { HomePageProps } from './types';
import './home.scss';

export class HomePage extends Block<HomePageProps> {
  constructor() {
    const currentPages = Object.values(PAGE_NAMES).map((page) => ({
      page,
      linkText: `Page ${page}`,
    }));

    const links = currentPages
      ?.map(({ linkText, page }) => new Link({ link: page, text: linkText })) || [];

    super('nav', {
      class: 'home-nav',
      children: { Links: links },
    });
  }

  render() {
    return template;
  }
}
