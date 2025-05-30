import { Block } from '@/core/block/block';
import type { Children } from '@/core/block/types';

import './styles.css';
import template from './form.hbs?raw';
import type { FormProps } from './types';

export class Form extends Block {
  constructor(props: FormProps | Children) {
    super('div', props);
  }

  render() {
    return template;
  }
}
