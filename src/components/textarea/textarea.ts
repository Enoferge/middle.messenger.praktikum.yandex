import { Block } from '@/core/block/block';
import { getPreparedAttrs } from '@/utils/attrs';

import type { TextareaProps } from './types';

export class Textarea extends Block<TextareaProps> {
  constructor(props: TextareaProps) {
    const {
      onChange, onFocus, onBlur, ...attrs
    } = props;
    super('textarea', {
      attrs: getPreparedAttrs(attrs),
      events: {
        change: (e) => onChange?.(e),
        blur: (e) => onBlur?.(e),
        focus: (e) => onFocus?.(e),
      },
    });
  }
}
