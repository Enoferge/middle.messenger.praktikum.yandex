import type { InputFieldProps } from '@/components/input-field/types';
import { FormFieldName } from '@/constants/formFields';

const commonLoginField = {
  label: 'Login',
  name: FormFieldName.Login,
  type: 'text',
  placeholder: 'Enter your login',
};

const commonPasswordField = {
  label: 'Password',
  name: FormFieldName.Password,
  type: 'password',
  minlength: 8,
  placeholder: 'Your password',
};

export const signInFields: Array<InputFieldProps> = [commonLoginField, commonPasswordField];

export const signUpFields: Array<InputFieldProps> = [
  {
    label: 'First Name',
    name: FormFieldName.FirstName,
    type: 'text',
    placeholder: 'Enter your first name',
  },
  {
    label: 'Second Name',
    name: FormFieldName.SecondName,
    type: 'text',
    placeholder: 'Enter your second name',
  },
  commonLoginField,
  {
    label: 'Display name',
    name: FormFieldName.DisplayName,
    type: 'text',
    placeholder: 'Enter your display name',
  },
  {
    label: 'Email',
    name: FormFieldName.Email,
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Phone',
    name: FormFieldName.Phone,
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
