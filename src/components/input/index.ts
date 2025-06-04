import { Block } from '@/core/block/block';
import { getPreparedAttrs } from '@/utils/attrs';
import { getStateModifierClasses } from '@/utils/get-state-modifier-classes';

import type { InputProps } from './types';

export class Input extends Block<InputProps> {
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

  computeClass() {
    return getStateModifierClasses('input-field__input', this.props.attrs || {}).join(' ');
  }
}
