import { Block } from '@/core/block/block';

import template from './icon.hbs?raw';
import type { IconProps } from './types';

export class Icon extends Block<IconProps> {
  constructor(props: IconProps) {
    super('div', props);
  }

  render() {
    return template;
  }
}
