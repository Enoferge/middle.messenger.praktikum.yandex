import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';
import { validateField } from '@/services/validation/validation';
import { areFormErrorsEqual } from '@/utils/equal';

import type { FormProps } from './types';
import './styles.css';
import template from './form.hbs?raw';

export class Form extends Block {
  constructor(props: FormProps) {
    const inputs =
      props.formFields?.map((fieldProps: InputFieldProps) => {
        return new InputField({
          ...fieldProps,
          value: props.formState?.[fieldProps.name],
          error: props.formErrors?.[fieldProps.name],
          onFieldChange: ({ name, value }) => {
            this.setProps({
              formState: {
                ...(this.props.formState || {}), // TODO: add generic
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
            this.setProps({
              formErrors: {
                ...(this.props.formErrors || {}), // TODO: add generic
                [name]: error,
              },
            });
          },
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
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();

          const errors = this.validateAllFields();
          this.setProps({
            formErrors: errors,
          });

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
    const errors: Record<string, string> = {};

    // TODO: add generic instead of Array.isArray
    if (Array.isArray(this.children.FormFields)) {
      this.children.FormFields?.forEach((inputField: InputField) => {
        const inputEl = inputField.getContent()?.querySelector('input') as HTMLInputElement;
        if (!inputEl) return;

        const error = validateField(
          inputEl.name,
          inputEl.value,
          this.props.formState as Record<string, string>
        );
        inputField.setProps({ error });

        if (error) {
          errors[inputEl.name] = error;
        }
      });

      this.setProps({
        errors,
      });

      return errors;
    }
  }

  componentDidUpdate(oldProps: FormProps, newProps: FormProps) {
    // TODO: add generic instead of Array.isArray
    if (Array.isArray(this.children.FormFields)) {
      if (!areFormErrorsEqual(oldProps.formErrors || {}, newProps.formErrors || {})) {
        this.children.FormFields?.forEach((inputField: InputField) => {
          const name = inputField.props.name;
          inputField.setProps({
            error: newProps.formErrors?.[String(name)] || '',
          });
        });
      }
    }

    return true;
  }

  render() {
    return template;
  }
}
