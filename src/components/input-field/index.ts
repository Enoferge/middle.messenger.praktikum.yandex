import { Block } from '@/core/block/block';
import { Input } from '@/components/input';
import { getStateModifierClasses } from '@/utils/get-state-modifier-classes';

import './styles.scss';
import template from './input-field.hbs?raw';
import type { InputFieldProps } from './types';
import { Icon } from '../icon';

export class InputField extends Block<InputFieldProps> {
  constructor(props: InputFieldProps) {
    const {
      label, onFieldChange, onFieldBlur, ...inputProps
    } = props;

    const isSearch = props.type === 'search';

    super('div', {
      ...inputProps,
      label,
      isSearch,
      children: {
        Input: new Input({
          ...inputProps,
          onChange: (e: Event) => {
            const { name, value } = e.target as HTMLInputElement;
            onFieldChange?.({ name, value });
          },
          onBlur: (e: Event) => {
            const { name, value } = e.target as HTMLInputElement;
            onFieldBlur?.({ name, value });
          },
        }),
        IconSearch: new Icon({
          name: 'search',
          class: 'input-field__icon-search',
        }),
      },
    });
  }

  computeClass() {
    return getStateModifierClasses('input-field', this.props).join(' ');
  }

  render() {
    return template;
  }
}
