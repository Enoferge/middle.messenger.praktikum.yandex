import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';
import { validateField } from '@/services/validation/validation';

import type { FormProps } from './types';
import './styles.css';
import template from './form.hbs?raw';

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    const inputs = props.formFields?.map((fieldProps: InputFieldProps) => new InputField({
      ...fieldProps,
      value: props.formState?.[fieldProps.name],
      error: props.formErrors?.[fieldProps.name],
      readonly: fieldProps.readonly || props.isFormReadonly,
      onFieldChange: ({ name, value }) => {
        this.setProps({
          formState: {
            ...(this.props.formState || {}),
            [name]: value,
          },
        });
      },
      onFieldBlur: ({ name, value }) => {
        const error = validateField(
          name,
          value,
              this.props.formState as Record<string, string>,
        );
        this.setProps({
          formErrors: {
            ...(this.props.formErrors || {}),
            [name]: error,
          },
        });
      },
    })) || [];

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
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const errors = this.validateAllFields();
          this.setProps({
            formErrors: errors,
          });

          console.log('SUBMIT');
          console.log(this.props.formState);
          console.log(`Form is ${this.isFormInvalid ? 'invalid' : 'valid'}`);
        },
      },
    });
  }

  get isFormInvalid() {
    return Object.values(this.props.formErrors || {}).some((el) => !!el);
  }

  validateAllFields() {
    return Object.entries(this.props.formState || {}).reduce<Record<string, string>>(
      (acc, [name, value]) => {
        acc[name] = validateField(name, value, this.props.formState);
        return acc;
      },
      {},
    );
  }

  componentDidUpdate(oldProps: FormProps, newProps: FormProps) {
    const fields = (this.children.FormFields || []) as Block[];

    fields.forEach((inputField: InputField) => {
      const { name } = inputField.props;

      if (oldProps.formErrors?.[String(name)] !== newProps.formErrors?.[String(name)]) {
        inputField.setProps({
          error: newProps.formErrors?.[String(name)] || '',
        });
      }
    });

    return false;
  }

  render() {
    return template;
  }
}
