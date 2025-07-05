import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';
import { validateField } from '@/core/validation/validation';
import { FormFieldName } from '@/constants/formFields';
import { TextareaField } from '@/components/textarea-field';
import type { TextareaFieldProps } from '@/components/textarea-field/types';
import isEqual from '@/utils/is-equal';
import { connect } from '@/core/hoc/connect-to-store';

import { formController } from '@/services/form-controller';
import type { FormProps } from './types';
import './styles.scss';
import template from './form.hbs?raw';
import { FormError } from '../form-error';

export interface FormWithStoreProps extends FormProps {
  formError?: string | null;
  isFormLoading?: boolean;
}

const mapStateToProps = (state: any) => ({
  formError: state.formError,
  isFormLoading: state.isFormLoading,
});

export class Form extends Block<FormWithStoreProps> {
  constructor(props?: FormProps) {
    if (!props) {
      throw new Error('Form: props are required');
    }

    super('form', {
      ...props,
      class: 'form',
      attrs: {
        id: props.formId,
        novalidate: true,
      },
      children: {
        FormFields: [],
        FormError: new FormError({
          error: formController.getError(),
        }),
        ...props.children,
      },
      events: {
        submit: async (e: Event) => {
          await this.handleFormSubmit(e);
        },
      },
    });
  }

  private createFieldComponents(props: FormProps): (InputField | TextareaField)[] {
    return props.formFields?.map((fieldProps: TextareaFieldProps | InputFieldProps) => {
      const commonProps = {
        ...fieldProps,
        value: props.formState?.[fieldProps.name],
        error: props.fieldsErrors?.[fieldProps.name],
        readonly: fieldProps.readonly || props.isFormReadonly,
        onFieldChange: this.handleFieldChange.bind(this),
        onFieldBlur: this.handleFieldBlur.bind(this),
      };

      if (fieldProps.fieldType === 'textarea') {
        return new TextareaField(commonProps);
      }

      return new InputField(commonProps);
    }) || [];
  }

  private handleFieldChange({ name, value }: { name: string, value: string }): void {
    if (formController.hasError()) {
      formController.clearError();
    }

    this.setProps({
      formState: {
        ...(this.props.formState || {}),
        [name]: value,
      },
    });
  }

  private handleFieldBlur({ name, value }: { name: string, value: string }): void {
    const error = validateField(
      name,
      value,
      this.props.formState as Record<string, string>,
    );
    this.setProps({
      fieldsErrors: {
        ...(this.props.fieldsErrors || {}),
        [name]: error,
      },
    });
  }

  private updateExistingFieldValues(formState: Record<string, string>, fieldsErrors: Record<string, string>, isFormReadonly: boolean): void {
    const fields = (this.children.FormFields || []) as (InputField | TextareaField)[];
    fields.forEach((field) => {
      const fieldName = field.props.name;
      const newValue = formState?.[fieldName];

      field.setProps({
        value: newValue,
        readonly: isFormReadonly,
        error: fieldsErrors?.[fieldName],
      });
    });
  }

  private async handleFormSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const errors = this.validateAllFields();
    this.setProps({
      fieldsErrors: errors,
    });

    console.log('SUBMIT FORM');
    console.log(this.props.formState);

    const filledFields = Object.fromEntries(
      Object.entries(this.props.formState || {}).filter(([name, value]) => value?.trim() !== '' && name !== FormFieldName.PasswordConfirm),
    );

    console.log(filledFields);
    console.log(`Form is ${this.isFormInvalid ? 'invalid' : 'valid'}`);

    if (!this.isFormInvalid) {
      try {
        await this.props.onSubmit?.(filledFields);
        formController.clearError();
        this.props.onSuccess?.();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        formController.setError(errorMessage);
      }
    }
  }

  get isFormInvalid() {
    return Object.values(this.props.fieldsErrors || {}).some((el) => !!el);
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

  componentDidUpdate(oldProps: FormWithStoreProps, newProps: FormWithStoreProps) {
    if (oldProps.formError !== newProps.formError) {
      if (this.children.FormError) {
        (this.children.FormError as FormError).setProps({ error: newProps.formError });
      }
      return false;
    }

    if (!isEqual(oldProps.formFields || {}, newProps.formFields || {})) {
      const newFields = this.createFieldComponents(newProps);

      this.updateChildren({
        ...this.children,
        FormFields: newFields,
      });

      return true;
    }

    if (!isEqual(oldProps.formState || {}, newProps.formState || {})
      || !isEqual(oldProps.fieldsErrors || {}, newProps.fieldsErrors || {})
      || oldProps.isFormReadonly !== newProps.isFormReadonly) {
      this.updateExistingFieldValues(newProps.formState || {}, newProps.fieldsErrors || {}, newProps.isFormReadonly || false);

      return false;
    }

    return false;
  }

  componentDidMount(): void {
    const fields = this.createFieldComponents(this.props);
    this.updateChildren({
      ...this.children,
      FormFields: fields,
    });

    this.forceUpdate();
  }

  componentWillUnmount(): void {
    formController.clearError();
  }

  render() {
    return template;
  }
}

export const ConnectedForm = connect<FormWithStoreProps, any>(mapStateToProps)(Form);
