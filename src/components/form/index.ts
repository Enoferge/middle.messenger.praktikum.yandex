import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';

import type { FormProps } from './types';
import './styles.css';
import template from './form.hbs?raw';

export class Form extends Block {
  constructor(props: FormProps) {
    const inputs =
      props.formFields?.map((field: InputFieldProps) => {
        return new InputField({
          ...field,
          value: props.formState[field.name],
        });
      }) || [];

    super('form', {
      ...props,
      class: 'form',
      attrs: {
        id: props.formId,
        novalidate: true,
      },
      children: {
        FormFields: inputs,
      },
    });
  }

  render() {
    return template;
  }
}
