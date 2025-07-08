import { Block } from '@/core/block/block';
import { getPreparedAttrs } from '@/utils/attrs';
import { getStateModifierClasses } from '@/utils/get-state-modifier-classes';
import isEqual from '@/utils/is-equal';

import type { InputProps } from './types';

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    const {
      onChange, onFocus, onBlur, ...attrs
    } = props;
    super('input', {
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
    return getStateModifierClasses('input-field__input', this.computeAttrs()).join(' ');
  }

  computeAttrs() {
    const {
      onChange: _onChange, onFocus: _onFocus, onBlur: _onBlur, ...attrs
    } = this.props;

    return getPreparedAttrs(attrs);
  }

  componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
    return !isEqual(oldProps, newProps);
  }
}
