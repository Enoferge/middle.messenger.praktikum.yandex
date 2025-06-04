import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';
import { validateField } from '@/services/validation/validation';
import { FormFieldName } from '@/constants/formFields';
import { TextareaField } from '@/components/textarea-field';
import type { TextareaFieldProps } from '@/components/textarea-field/types';

import type { FormProps } from './types';
import './styles.scss';
import template from './form.hbs?raw';

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    const fields = props.formFields?.map((fieldProps: TextareaFieldProps | InputFieldProps) => {
      const commonProps = {
        ...fieldProps,
        value: props.formState?.[fieldProps.name],
        error: props.formErrors?.[fieldProps.name],
        readonly: fieldProps.readonly || props.isFormReadonly,
        onFieldChange: ({ name, value }: { name: string, value: string }) => {
          this.setProps({
            formState: {
              ...(this.props.formState || {}),
              [name]: value,
            },
          });
        },
        onFieldBlur: ({ name, value }: { name: string, value: string }) => {
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
      };

      if (fieldProps.fieldType === 'textarea') {
        return new TextareaField(commonProps);
      }

      return new InputField(commonProps);
    }) || [];

    super('form', {
      ...props,
      class: 'form',
      attrs: {
        id: props.formId,
        novalidate: true,
      },
      children: {
        FormFields: fields,
      },
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const errors = this.validateAllFields();
          this.setProps({
            formErrors: errors,
          });

          console.log('SUBMIT');

          const filledFields = Object.fromEntries(
            Object.entries(this.props.formState || {}).filter(([name, value]) => value.trim() !== '' && name !== FormFieldName.PasswordConfirm),
          );

          console.log(filledFields);
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
    const fields = (this.children.FormFields || []) as InputField[];

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
