import { Block } from '@/core/block/block';
import { Textarea } from './textarea';

import './styles.css';
import template from './textarea.hbs?raw';
import type { TextareaFieldProps } from './types';

export class TextareaField extends Block<TextareaFieldProps> {
  constructor(props: TextareaFieldProps) {
    const {
      label, onFieldChange, onFieldBlur, ...textareaProps
    } = props;

    const states: Array<keyof TextareaFieldProps> = ['error', 'readonly', 'disabled'];
    const textareaClasses = states.reduce<string[]>(
      (acc, state) => {
        if (props[state]) {
          acc.push(`textarea-field__textarea_${String(state)}`);
        }
        return acc;
      },
      ['textarea-field__textarea'],
    );

    super('div', {
      ...textareaProps,
      label,
      children: {
        TextArea: new Textarea({
          ...textareaProps,
          class: textareaClasses.join(' '),
          onChange: (e: Event) => {
            const { name, value } = e.target as HTMLTextAreaElement;
            onFieldChange?.({ name, value });
          },
          onBlur: (e: Event) => {
            const { name, value } = e.target as HTMLTextAreaElement;
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
