import { Block } from '@/core/block/block';

import type { AvatarProps } from './types';
import template from './avatar.hbs?raw';
import './styles.scss';

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    const classes = ['avatar', props.class || ''].filter(Boolean).join(' ');

    const attrs: Record<string, unknown> = {
      style: props.size ? `--avatar-size: ${props.size}px` : undefined,
    };

    super('div', {
      ...props,
      class: classes,
      attrs,
    });
  }

  render() {
    return template;
  }
}
