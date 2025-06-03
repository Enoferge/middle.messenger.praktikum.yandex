import { Block } from '@/core/block/block';

import type { ButtonProps } from './types';
import template from './button.hbs?raw';
import './styles.css';

export class Button extends Block {
  constructor(props: ButtonProps) {
    const tagName = props.tag || 'button';

    super(tagName, {
      ...props,
      events: {
        click: (e) => props.onClick?.(e),
        blur: (e) => props.onBlur?.(e),
        focus: (e) => props.onFocus?.(e),
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

  getComputedAttributes() {
    const attrs: Record<string, unknown> = {
      type: this.props.type || 'button',
      name: this.props.name,
      form: this.props.formId,
    };

    if (this.props.disabled) {
      if (this.props.tag) {
        attrs['aria-disabled'] = 'true';
        attrs['tabindex'] = '-1';
      } else {
        attrs['disabled'] = true;
      }
    }

    return attrs;
  }

  render() {
    return template;
  }
}
