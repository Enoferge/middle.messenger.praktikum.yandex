import type { InputFieldProps } from '@/components/input-field/types';
import { FormFieldName, FORM_FIELD_TYPE } from '@/constants/formFields';

const commonLoginField = {
  label: 'Login',
  name: FormFieldName.Login,
  type: 'text',
  placeholder: 'Enter your login',
  fieldType: FORM_FIELD_TYPE.Input,
};

const commonPasswordField = {
  label: 'Password',
  name: FormFieldName.Password,
  type: 'password',
  minlength: 8,
  placeholder: 'Your password',
  fieldType: FORM_FIELD_TYPE.Input,
};

export const signInFields: Array<InputFieldProps> = [commonLoginField, commonPasswordField];

export const signUpFields: Array<InputFieldProps> = [
  {
    label: 'First Name',
    name: FormFieldName.FirstName,
    type: 'text',
    placeholder: 'Enter your first name',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Second Name',
    name: FormFieldName.SecondName,
    type: 'text',
    placeholder: 'Enter your second name',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  commonLoginField,
  {
    label: 'Display name',
    name: FormFieldName.DisplayName,
    type: 'text',
    placeholder: 'Enter your display name',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Email',
    name: FormFieldName.Email,
    type: 'email',
    placeholder: 'Enter your email',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Phone',
    name: FormFieldName.Phone,
    type: 'tel',
    error: 'Error message',
    placeholder: 'Enter your phone number',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  commonPasswordField,
  {
    label: 'Password confirm',
    name: FormFieldName.PasswordConfirm,
    type: 'password',
    minlength: 8,
    placeholder: 'Repeat your password',
    fieldType: FORM_FIELD_TYPE.Input,
  },
];
