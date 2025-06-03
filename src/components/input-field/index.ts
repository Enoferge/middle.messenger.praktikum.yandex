import { Block } from '@/core/block/block';
import { Input } from '@/components/input';
import type { Props } from '@/core/block/types';

import './styles.css';
import template from './input.hbs?raw';
import type { InputFieldProps } from './types';

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    const { label, onFieldChange, onFieldBlur, ...inputProps } = props;

    super('div', {
      ...props,
      children: {
        Input: new Input({
          ...inputProps,
          class: 'input-field__input',
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

  computeClass(): string {
    const classes = ['input-field'];

    const states: Array<keyof InputFieldProps> = ['error', 'readonly', 'disabled'];

    for (let state of states) {
      if (this.props[state]) {
        classes.push(`input-field_${String(state)}`);
      }
    }

    return classes.join(' ');
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const { label, error, onFieldChange, onFieldBlur, ...attrs } = newProps;

    (this.children.Input as Block).setProps({ attrs });

    return true;
  }

  render() {
    return template;
  }
}
