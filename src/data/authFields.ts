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

export const signUpFields: Array<InputFieldProps> = [
  {
    label: 'First Name',
    name: 'first_name',
    type: 'text',
    placeholder: 'Enter your first name',
  },
  {
    label: 'Second Name',
    name: 'second_name',
    type: 'text',
    placeholder: 'Enter your second name',
  },
  commonLoginField,
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    error: 'Error message',
    placeholder: 'Enter your phone number',
  },
  commonPasswordField,
  {
    label: 'Password confirm',
    name: 'password_confirm',
    type: 'password',
    minlength: 8,
    placeholder: 'Repeat your password',
  },
];
