import { Block } from '@/core/block/block';

import type { ButtonProps } from './types';
import template from './button.hbs?raw';
import './styles.scss';
import { Icon } from '../icon';

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    const tagName = props.tag || 'button';

    super(tagName, {
      ...props,
      children: {
        ...(props.iconName ? {
          Icon: new Icon({
            name: props.iconName,
            class: 'button__icon',
          }),
        } : {}),
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
      this.props.iconName ? 'button_with-icon' : '',
    ].filter(Boolean).join(' ');
  }

  computeAttrs() {
    const attrs: Record<string, unknown> = {
      type: this.props.type || 'button',
      name: this.props.name,
      form: this.props.formId,
    };

    if (this.props.disabled) {
      if (this.props.tag) {
        attrs['aria-disabled'] = 'true';
        attrs.tabindex = '-1';
      } else {
        attrs.disabled = true;
      }
    }
    return attrs;
  }

  computeEvents() {
    return {
      click: (e: Event) => this.props.onClick?.(e),
      blur: (e: Event) => this.props.onBlur?.(e),
      focus: (e: Event) => this.props.onFocus?.(e),
    };
  }

  render() {
    return template;
  }
}
