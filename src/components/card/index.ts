import { Block } from '@/core/block/block';
import type { CardProps } from './types';

import './styles.scss';
import template from './card.hbs?raw';

export class Card extends Block<CardProps> {
  constructor(props: CardProps) {
    super('section', {
      ...props,
      class: 'card',
      attrs: { role: `${props.title}-dialog`, 'aria-labelledby': `${props.title}-title` },
    });
  }

  render() {
    return template;
  }
}
