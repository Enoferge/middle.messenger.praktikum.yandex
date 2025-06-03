import { Block } from '@/core/block/block';
import { Link } from '@/components/link';

import template from './error.hbs?raw';
import './styles.css';
import type { ErrorPageProps } from './types';

export class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    const pageTitleClass = props.code === '400' || props.code === '404' ? 'page-title_warning' : 'page-title_error';

    super('div', {
      ...props,
      class: 'error__wrapper',
      pageTitleClass,
      children: {
        Link: new Link({
          page: 'messenger',
          text: 'Return to chats',
        }),
      },
    });
  }

  render() {
    return template;
  }
}
