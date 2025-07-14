import { Block } from '@/core/block/block';
import { Icon } from '@/components/icon';

import type { IconButtonProps } from './types';
import template from './icon-button.hbs?raw';
import './styles.scss';

export class IconButton extends Block<IconButtonProps> {
  constructor(props: IconButtonProps) {
    super('button', {
      ...props,
      events: {
        click: (e) => props.onClick?.(e),
      },
      children: {
        Icon: new Icon({ class: 'icon-button__icon', name: props.iconName }),
      },
    });
  }

  computeClass(): string {
    return ['icon-button', `icon-button_${this.props.variant || 'filled'}`, this.props.class || '']
      .filter(Boolean)
      .join(' ');
  }

  computeAttrs() {
    const attrs: Record<string, unknown> = {
      type: this.props.type || 'button',
      ...(this.props.name ? { form: this.props.name } : {}),
      ...(this.props.form ? { form: this.props.form } : {}),
    };

    if (this.props.disabled) {
      attrs.disabled = true;
    }

    return attrs;
  }

  render() {
    return template;
  }
}
