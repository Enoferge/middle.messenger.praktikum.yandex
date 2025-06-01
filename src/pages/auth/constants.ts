import type { InputFieldProps } from '@/components/input-field/types';

const commonLoginField = {
  label: 'Login',
  name: 'login',
  type: 'text',
  placeholder: 'Enter your login',
};

const commonPasswordField = {
  label: 'Password',
  name: 'password',
  type: 'password',
  minlength: 8,
  placeholder: 'Your password',
};

export const signInFields: Array<InputFieldProps> = [commonLoginField, commonPasswordField];
