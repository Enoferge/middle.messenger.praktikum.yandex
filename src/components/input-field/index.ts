import { Block } from '@/core/block/block';
import { Input } from '@/components/input';

import './styles.css';
import template from './input.hbs?raw';
import type { InputFieldProps } from './types';

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    const {
      label, onFieldChange, onFieldBlur, ...inputProps
    } = props;

    const states: Array<keyof InputFieldProps> = ['error', 'readonly', 'disabled'];
    const inputClasses = states.reduce<string[]>(
      (acc, state) => {
        if (props[state]) {
          acc.push(`input-field__input_${String(state)}`);
        }
        return acc;
      },
      ['input-field__input'],
    );

    super('div', {
      ...inputProps,
      label,
      children: {
        Input: new Input({
          ...inputProps,
          class: inputClasses.join(' '),
          onChange: (e: Event) => {
            const { name, value } = e.target as HTMLInputElement;
            onFieldChange?.({ name, value });
          },
          onBlur: (e: Event) => {
            const { name, value } = e.target as HTMLInputElement;
            onFieldBlur?.({ name, value });
          },
        }),
      },
    });
  }

  render() {
    return template;
  }
}
