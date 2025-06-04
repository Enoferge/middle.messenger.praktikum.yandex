import { Block } from '@/core/block/block';
import { getPreparedAttrs } from '@/utils/attrs';
import { getStateModifierClasses } from '@/utils/get-state-modifier-classes';

import type { TextareaProps } from './types';

export class Textarea extends Block<TextareaProps> {
  constructor(props: TextareaProps) {
    const {
      onChange, onFocus, onBlur, ...attrs
    } = props;
    super('textarea', {
      ...props,
      attrs: getPreparedAttrs(attrs),
      events: {
        change: (e) => onChange?.(e),
        blur: (e) => onBlur?.(e),
        focus: (e) => onFocus?.(e),
      },
    });
  }

  computeClass() {
    return getStateModifierClasses('textarea-field__textarea', this.props).join(' ');
  }
}
