import { Block } from '@/core/block/block';
import { Input } from '@/components/input';

import './styles.css';
import template from './input.hbs?raw';
import type { InputFieldProps } from './types';
import { validateField } from '@/services/validation/validation';

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    const { label, error, ...inputProps } = props;

    super('div', {
      ...props,
      children: {
        Input: new Input({
          ...inputProps,
          class: 'input-field__input',
          onChange: (e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            const error = validateField(target.name, target.value);

            console.log('input changed ');
            console.log(target.name);

            this.setProps({ error });
          },
        }),
      },
    });
  }

  computeClass(): string {
    const classes = ['input-field'];

    const states: Array<keyof InputFieldProps> = ['error', 'readonly', 'disabled'];

    for (let state of states) {
      if (this.props[state]) {
        classes.push(`input-field_${state}`);
      }
    }

    return classes.join(' ');
  }

  render() {
    return template;
  }
}
