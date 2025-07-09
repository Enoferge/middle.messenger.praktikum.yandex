import { Block } from '@/core/block/block';
import { getStateModifierClasses } from '@/utils/get-state-modifier-classes';
import { Textarea } from '@/components/textarea';

import './styles.scss';
import template from './textarea-field.hbs?raw';
import type { TextareaFieldProps } from './types';

export class TextareaField extends Block<TextareaFieldProps> {
  constructor(props: TextareaFieldProps) {
    const {
      label, onFieldChange, onFieldBlur, ...textareaProps
    } = props;

    super('div', {
      ...textareaProps,
      label,
      children: {
        Textarea: new Textarea({
          ...textareaProps,
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

  computeClass() {
    return getStateModifierClasses('textarea-field', this.props).join(' ');
  }

  render() {
    return template;
  }
}
