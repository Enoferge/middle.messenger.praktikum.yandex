import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';
import { validateField } from '@/core/validation/validation';
import { FormFieldName } from '@/constants/formFields';
import { TextareaField } from '@/components/textarea-field';
import type { TextareaFieldProps } from '@/components/textarea-field/types';
import { connect } from '@/core/hoc/connect-to-store';

import type { ConnectedFormProps, FormProps, FormState } from './types';
import './styles.scss';
import template from './form.hbs?raw';

export class InnerForm extends Block<FormProps> {
  constructor(props?: FormProps) {
    if (!props) {
      throw new Error('InnerForm: props are required');
    }

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
        submit: async (e: Event) => {
          e.preventDefault();

          const errors = this.validateAllFields();
          this.setProps({
            formErrors: errors,
          });

          console.log('SUBMIT FORM');
          console.log(this.props.formState);

          const filledFields = Object.fromEntries(
            Object.entries(this.props.formState || {}).filter(([name, value]) => value.trim() !== '' && name !== FormFieldName.PasswordConfirm),
          );

          console.log(filledFields);
          console.log(`Form is ${this.isFormInvalid ? 'invalid' : 'valid'}`);

          if (!this.isFormInvalid) {
            await this.props.onSubmit?.(filledFields);
            console.log('props.formError');
            console.log(this.props.formError);

            if (!this.props.formError) {
              this.props.onSuccess?.();
            } else {
              console.log('Login request failed');
            }
          }
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

  componentDidUpdate(oldProps: ConnectedFormProps, newProps: ConnectedFormProps) {
    const fields = (this.children.FormFields || []) as InputField[];

    fields.forEach((inputField: InputField) => {
      const { name } = inputField.props;

      if (oldProps.formErrors?.[String(name)] !== newProps.formErrors?.[String(name)]) {
        inputField.setProps({
          error: newProps.formErrors?.[String(name)] || '',
        });
      }
    });

    if (oldProps.formError !== newProps.formError) {
      return true;
    }

    return false;
  }

  componentDidMount(): void {
    console.log('MOUNTED FORM, clear state');
    // not do in component
    window.store.set({
      isFormLoading: false,
      formError: null,
    });
  }

  render() {
    return template;
  }
}

const mapStateToProps = (state: FormState) => ({
  isFormLoading: state.isFormLoading,
  formError: state.formError,
});

export const Form = connect<FormProps, FormState>(mapStateToProps)(InnerForm);
