import type { FormProps } from '@/components/form/types';
import { INPUT_VALIDATORS } from './constants';

export function validateField(name: string, value: string, formState: FormProps['formState']) {
  if (name === 'password_confirm') {
    return value === formState.password ? '' : 'Typed passwords are not equal';
  }

  const { validator, errorMsg } = INPUT_VALIDATORS[name] || {};

  if (validator) {
    return validator.test(value) ? '' : errorMsg;
  }

  return '';
}
