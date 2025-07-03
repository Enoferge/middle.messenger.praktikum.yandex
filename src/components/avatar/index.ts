import { Block } from '@/core/block/block';

import type { AvatarProps } from './types';
import template from './avatar.hbs?raw';
import './styles.scss';

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', {
      ...props,
    });
  }

  computeClass(): string {
    return ['avatar', this.props.class || ''].filter(Boolean).join(' ');
  }

  computeAttrs(): Record<string, unknown> {
    return { style: this.props.size ? `--avatar-size: ${this.props.size}px` : undefined };
  }

  render() {
    return template;
  }
}
