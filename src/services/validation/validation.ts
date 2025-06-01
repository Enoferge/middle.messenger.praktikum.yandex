import type { FormProps } from '@/components/form/types';
import { INPUT_VALIDATORS } from './constants';

export function validateField(name: string, value: string, formState: FormProps['formState']) {
  if (name === 'password_confirm') {
    return value === formState.password ? '' : 'Typed passwords are not equal';
  }

  let preparedValue = value;

  if (name === 'phone') {
    preparedValue = preparedValue.replace(/\s+/g, '');
  }

  const { validator, errorMsg } = INPUT_VALIDATORS[name] || {};

  if (validator) {
    return validator.test(preparedValue) ? '' : errorMsg;
  }

  return '';
}
