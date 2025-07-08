import { Block } from '@/core/block/block';
import { InputField } from '@/components/input-field';
import type { InputFieldProps } from '@/components/input-field/types';
import { validateField } from '@/core/validation/validation';
import { FormFieldName } from '@/constants/formFields';
import { TextareaField } from '@/components/textarea-field';
import type { TextareaFieldProps } from '@/components/textarea-field/types';
import isEqual from '@/utils/is-equal';
import type { FocusableField } from '@/types/base-field-types';

import type { FormProps } from './types';
import './styles.scss';
import template from './form.hbs?raw';
import { FormError } from '../form-error';
import { FormLoadingSpinner } from '../form-loading-spinner';

export class Form extends Block<FormProps> {
  private fieldRefs: Record<string, FocusableField> = {};

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
          error: props.formError || null,
        }),
        FormLoadingSpinner: new FormLoadingSpinner({
          isLoading: props.isFormLoading || false,
        }),
        ...props.children,
      },
      events: {
        submit: async (e: Event) => {
          await this.handleFormSubmit(e);
        },
      },
    });

    if (this.children.FormLoadingSpinner) {
      (this.children.FormLoadingSpinner as FormLoadingSpinner).hide();
    }
  }

  private createFieldComponents(props: FormProps): (InputField | TextareaField)[] {
    this.fieldRefs = {};

    return props.formFields?.map((fieldProps: TextareaFieldProps | InputFieldProps, idx: number, arr) => {
      const commonProps: TextareaFieldProps | InputFieldProps = {
        ...fieldProps,
        value: props.formState?.[fieldProps.name],
        error: props.touchedFields?.[fieldProps.name] ? (props.fieldsErrors?.[fieldProps.name] || '') : '',
        readonly: fieldProps.readonly || props.isFormReadonly,
        onFieldChange: this.handleFieldChange.bind(this),
        onFieldBlur: this.handleFieldBlur.bind(this),
      };

      if (idx === arr.length - 1 && props.submitOnEnter) {
        commonProps.onEnterPressed = async ({ name, value }) => {
          this.handleFieldChange({ name, value });
          await this.submitForm();
        };
      }

      const fieldComponent = fieldProps.fieldType === 'textarea'
        ? new TextareaField(commonProps)
        : new InputField(commonProps);

      this.fieldRefs[fieldProps.name] = fieldComponent;

      return fieldComponent;
    }) || [];
  }

  private handleFieldChange({ name, value }: { name: string, value: string }) {
    if (this.props.formError) {
      this.setProps({
        formError: null,
      });
    }

    this.setProps({
      formState: {
        ...(this.props.formState || {}),
        [name]: value,
      },
    });
  }

  private handleFieldBlur({ name, value }: { name: string, value: string }): void {
    this.setProps({
      touchedFields: {
        ...(this.props.touchedFields || {}),
        [name]: true,
      },
    });

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
      const showError = this.props.touchedFields?.[fieldName];
      const error = showError ? fieldsErrors?.[fieldName] : null;

      field.setProps({
        value: newValue,
        readonly: isFormReadonly,
        error,
      });
    });
  }

  private async handleFormSubmit(e: Event): Promise<void> {
    e.preventDefault();

    this.submitForm();
  }

  private async submitForm() {
    const errors = this.validateAllFields();
    const allTouched = Object.keys(this.props.formState || {}).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    this.setProps({
      fieldsErrors: errors,
      touchedFields: allTouched,
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
        this.setProps({ isFormLoading: true });
        await this.props.onSubmit?.(filledFields);
        this.setProps({ formError: null, isFormLoading: false });
        this.clearForm();

        if (this.props.focusFieldAfterSubmit && this.fieldRefs[this.props.focusFieldAfterSubmit]) {
          const field = this.fieldRefs[this.props.focusFieldAfterSubmit];
          field?.focus();
        }

        this.props.onSuccess?.();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        this.setProps({ formError: errorMessage, isFormLoading: false });
      }
    }
  }

  private clearForm() {
    const clearedFormState = Object.keys(this.props.formState || {}).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, string>);

    this.setProps({
      formState: clearedFormState,
      fieldsErrors: {},
      touchedFields: {},
    });

    this.updateExistingFieldValues(clearedFormState, {}, false);
  }

  get isFormInvalid() {
    return Object.entries(this.props.fieldsErrors || {}).some(
      ([name, error]) => !!error && this.props.touchedFields?.[name],
    );
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
    if (oldProps.formError !== newProps.formError) {
      if (this.children.FormError) {
        (this.children.FormError as FormError).setProps({ error: newProps.formError });
      }
    }

    if (oldProps.isFormLoading !== newProps.isFormLoading) {
      if (this.children.FormLoadingSpinner) {
        if (newProps.isFormLoading) {
          (this.children.FormLoadingSpinner as FormLoadingSpinner).show();
        } else {
          (this.children.FormLoadingSpinner as FormLoadingSpinner).hide();
        }
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
      || oldProps.isFormReadonly !== newProps.isFormReadonly
      || !isEqual(oldProps.touchedFields || {}, newProps.touchedFields || {})) {
      this.updateExistingFieldValues(
        newProps.formState || {},
        newProps.fieldsErrors || {},
        newProps.isFormReadonly || false,
      );
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

  render() {
    return template;
  }
}
