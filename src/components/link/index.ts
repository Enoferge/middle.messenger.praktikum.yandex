import { Block } from '@/core/block/block';

import './styles.css';
import template from './link.hbs?raw';
import type { LinkProps } from './types';

export class Link extends Block {
  constructor(props: LinkProps) {
    super('div', props); //TODO: refac tagName
  }

  render() {
    return template;
  }
}
