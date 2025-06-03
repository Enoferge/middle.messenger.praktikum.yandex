import { Block } from '@/core/block/block';
import { getPreparedAttrs } from '@/utils/attrs';

import type { InputProps } from './types';

export class Input extends Block {
  constructor(props: InputProps) {
    const {
      onChange, onFocus, onBlur, ...attrs
    } = props;
    super('input', {
      attrs: getPreparedAttrs(attrs),
      events: {
        change: (e) => onChange?.(e),
        blur: (e) => onBlur?.(e),
        focus: (e) => onFocus?.(e),
      },
    });
  }
}
