import { Block } from '@/core/block/block';
import { Input } from '@/components/input';
import { getStateModifierClasses } from '@/utils/get-state-modifier-classes';
import isEqual from '@/utils/is-equal';
import type { FocusableField } from '@/types/base-field-types';

import './styles.scss';
import template from './input-field.hbs?raw';
import type { InputFieldProps } from './types';
import { Icon } from '../icon';

export class InputField extends Block<InputFieldProps> implements FocusableField {
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

  componentDidUpdate(oldProps: InputFieldProps, newProps: InputFieldProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      if (this.children.Input) {
        (this.children.Input as Input).setProps({ ...newProps });
      }
      return true;
    }

    return false;
  }

  render() {
    return template;
  }

  public focus() {
    const element = this.getContent() as HTMLInputElement;
    if (element) {
      element.focus();
    }
  }
}
