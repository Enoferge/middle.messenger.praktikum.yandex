import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';
import { validateField } from '@/services/validation/validation';
import { areSimpleObjectsEqual } from '@/utils/equal';

import type { FormProps } from './types';
import './styles.css';
import template from './form.hbs?raw';

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    const formErrors = Object.keys(props.formState || {}).reduce<Record<string, string>>(
      (acc, field) => {
        acc[field] = '';
        return acc;
      },
      {}
    );

    const inputs =
      props.formFields?.map((fieldProps: InputFieldProps) => {
        const { name, readonly } = fieldProps;

        return new InputField({
          ...fieldProps,
          value: props.formState?.[name],
          error: '',
          readonly: readonly || props.isFormReadonly,
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
              this.props.formState as Record<string, string>
            );

            if (this.props.formErrors?.[name] !== error) {
              this.setProps({
                formErrors: {
                  ...(this.props.formErrors || {}),
                  [name]: error,
                },
              });
            }
          },
        });
      }) || [];

    super('form', {
      ...props,
      formErrors,
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

          if (this.props.formErrors && !areSimpleObjectsEqual(errors, this.props.formErrors)) {
            this.setProps({
              formErrors: errors,
            });
          }

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
      {}
    );
  }

  componentDidUpdate(oldProps: FormProps, newProps: FormProps) {
    const fields = (this.children.FormFields || []) as Block[];

    fields.forEach((inputField: InputField) => {
      const name = inputField.props.name;

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
