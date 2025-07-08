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
          onKeyDown: async (e: Event) => {
            const { name, value } = e.target as HTMLTextAreaElement;
            if (props.onEnterPressed) {
              const keyboardEvent = e as KeyboardEvent;
              if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
                e.preventDefault();
                await props.onEnterPressed({ name, value });
              }
            }
          },
        }),
      },
    });
  }

  computeClass() {
    return getStateModifierClasses('textarea-field', this.props).join(' ');
  }

  componentDidUpdate(oldProps: TextareaFieldProps, newProps: TextareaFieldProps): boolean {
    if (oldProps.value !== newProps.value) {
      const textarea = this.children.Textarea as Textarea;
      textarea.setProps({ value: newProps.value });
      return true;
    }

    return false;
  }

  render() {
    return template;
  }
}
