import { Block } from '@/core/block/block';
import { getPreparedAttrs } from '@/utils/attrs';

import type { InputProps } from './types';

export class Input extends Block {
  constructor(props: InputProps) {
    const { onChange, onFocus, onBlur, ...attrs } = props;
    super('input', {
      attrs: getPreparedAttrs(attrs),
      events: {
        change: props.onChange,
        blur: props.onBlur,
        focus: props.onFocus,
      },
    });
  }
}
