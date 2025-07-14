import type { FormProps } from '@/components/form/types';
import { FormFieldName } from '@/constants/formFields';
import { INPUT_VALIDATORS } from './constants';

export function validateField(name: string, value: string, formState: FormProps['formState']) {
  if (name === FormFieldName.PasswordConfirm) {
    if (!value) {
      return 'Password confirmation is required';
    }
    return value === formState?.password ? '' : 'Typed passwords are not equal';
  }

  let preparedValue = value;

  if (name === FormFieldName.Phone) {
    preparedValue = preparedValue.replace(/\s+/g, '');
  }

  const { validator, errorMsg } = INPUT_VALIDATORS[name] || {};

  if (validator) {
    return validator.test(preparedValue) ? '' : errorMsg;
  }

  return '';
}
