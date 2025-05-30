import { Block } from '@/core/block/block';

import './styles.css';
import template from './form.hbs?raw';
import type { FormProps } from './types';

export class Form extends Block {
  constructor(props: FormProps) {
    super('div', props);
  }

  render() {
    return template;
  }
}
