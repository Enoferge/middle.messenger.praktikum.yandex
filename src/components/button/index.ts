import { Block } from '@/core/block/block';

import type { ButtonProps } from './types';
import template from './button.hbs?raw';
import './styles.css';
import { Icon } from '../icon';

export class Button extends Block<ButtonProps> {
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
        attrs.tabindex = '-1';
      } else {
        attrs.disabled = true;
      }
    }

    const classes = [
      'button',
      `button_${props.variant || 'default'}`,
      props.fullWidth ? 'button_full' : '',
      props.isAccent ? 'button_accent' : '',
      props.icon ? 'button_with-icon' : '',
      props.class || '',
      props.iconName ? 'button_with-icon' : '',
    ].filter(Boolean).join(' ');

    super(tagName, {
      ...props,
      class: classes,
      attrs,
      events: {
        click: (e: Event) => props.onClick?.(e),
        blur: (e: Event) => props.onBlur?.(e),
        focus: (e: Event) => props.onFocus?.(e),
      },
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

  render() {
    return template;
  }
}
