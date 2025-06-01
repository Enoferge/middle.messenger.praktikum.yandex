import { INPUT_VALIDATORS } from './constants';

export function validateField(name: string, value: string) {
  const { validator, errorMsg } = INPUT_VALIDATORS[name];

  if (validator) {
    return validator.test(value) ? '' : errorMsg;
  }

  return '';
}
