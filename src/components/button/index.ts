import { Block } from '@/core/block/block';

import type { ButtonProps } from './types';
import template from './button.hbs?raw';
import './styles.css';

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', {
      ...props,
      events: {
        click: props.onClick,
        blur: props.onBlur,
        focus: props.onFocus,
      },
    });
  }

  render() {
    return template;
  }
}
