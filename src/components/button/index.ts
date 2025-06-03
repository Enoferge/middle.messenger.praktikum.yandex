import { Block } from '@/core/block/block';

import type { ButtonProps } from './types';
import template from './button.hbs?raw';
import './styles.css';

export class Button extends Block {
  constructor(props: ButtonProps) {
    const tagName = props.tag || 'button';

    const attrs: Record<string, unknown> = {
      type: props.type || 'button',
      name: props.name,
      form: props.formId,
    };

    if (props.disabled) {
      if (props.tag) {
        attrs['aria-disabled'] = 'true';
        attrs['tabindex'] = '-1';
      } else {
        attrs['disabled'] = true;
      }
    }

    super(tagName, {
      ...props,
      attrs,
      events: {
        click: props.onClick,
        blur: props.onBlur || (() => {}),
        focus: props.onFocus || (() => {}),
      },
    });
  }

  computeClass(): string {
    return [
      'button',
      `button_${this.props.variant || 'default'}`,
      this.props.fullWidth ? 'button_full' : '',
      this.props.isAccent ? 'button_accent' : '',
      this.props.icon ? 'button_with-icon' : '',
      this.props.class || '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  render() {
    return template;
  }
}
