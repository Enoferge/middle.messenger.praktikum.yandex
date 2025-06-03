import { Block } from '@/core/block/block';
import { Icon } from '@/components/icon';

import type { IconButtonProps } from './types';
import template from './icon-button.hbs?raw';
import './styles.css';

export class IconButton extends Block {
  constructor(props: IconButtonProps) {
    const classes = ['icon-button', `icon-button_${props.variant || 'filled'}`, props.class || '']
      .filter(Boolean)
      .join(' ');

    const attrs: Record<string, unknown> = {
      class: classes,
      type: props.type || 'button',
      name: props.name,
    };

    if (props.disabled) {
      attrs.disabled = true;
    }

    super('button', {
      ...props,
      attrs,
      events: {
        click: props.onClick,
      },
      children: {
        Icon: new Icon({ class: 'icon-button__icon', name: props.iconName }),
      },
    });
  }

  render() {
    return template;
  }
}
