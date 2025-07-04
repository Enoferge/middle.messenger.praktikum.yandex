import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

import template from './tooltip.hbs?raw';
import './styles.scss';

export interface TooltipProps extends Props {
  children: {
    Trigger: Block;
    Content: Block;
  };
}

export class Tooltip extends Block<TooltipProps> {
  constructor(props: TooltipProps) {
    super('div', {
      ...props,
      visible: false,
      class: 'tooltip__wrapper',
      events: {
        click: () => this.toggleContent(),
      },
    });

  }

  toggleContent() {
    this.setProps({ visible: !this.props.visible });
  }

  render() {
    return template;
  }
} 