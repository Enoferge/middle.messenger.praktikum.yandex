import { Block } from '@/core/block/block';

import './styles.css';
import template from './input.hbs?raw';
import type { InputFieldProps } from './types';

export class Input extends Block {
  constructor(props: InputFieldProps) {
    super('div', props);
  }

  render() {
    return template;
  }
}
