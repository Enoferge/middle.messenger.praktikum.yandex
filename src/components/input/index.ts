import { Block } from '@/core/block/block';

import type { InputProps } from './types';

export class Input extends Block {
  constructor(props: InputProps) {
    const { onChange, onFocus, onBlur, ...attrs } = props;
    super('input', {
      attrs,
      events: {
        change: (e) => props.onChange?.(e),
        blur: (e) => props.onBlur?.(e),
        focus: (e) => props.onFocus?.(e),
      },
    });
  }
}
