import { Block } from '@/core/block/block';

import template from './icon.hbs?raw';
import type { IconProps } from './types';

export class Icon extends Block {
  constructor(props: IconProps) {
    super('fragment', props);
  }

  render() {
    return template;
  }
}
