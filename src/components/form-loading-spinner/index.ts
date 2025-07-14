import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

import template from './form-loading-spinner.hbs?raw';
import './styles.scss';

export class FormLoadingSpinner extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      class: 'form-loading',
    });
  }

  render() {
    return template;
  }
}
