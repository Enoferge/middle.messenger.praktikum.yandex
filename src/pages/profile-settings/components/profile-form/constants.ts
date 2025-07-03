import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import type { InputFieldProps } from '@/components/input-field/types';

export const PROFILE_INFO_FIELDS: InputFieldProps[] = [
  { label: 'First name', name: FormFieldName.FirstName, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Second name', name: FormFieldName.SecondName, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Display name', name: FormFieldName.DisplayName, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Login', name: FormFieldName.Login, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Email', name: FormFieldName.Email, type: 'email', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Phone', name: FormFieldName.Phone, type: 'tel', fieldType: FORM_FIELD_TYPE.Input },
];

export const PROFILE_PASSWORD_FIELDS: InputFieldProps[] = [
  { label: 'Old password', name: FormFieldName.OldPassword, type: 'password', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'New password', name: FormFieldName.Password, type: 'password', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Repeat password', name: FormFieldName.PasswordConfirm, type: 'password', fieldType: FORM_FIELD_TYPE.Input },
];

export const FORM_PASSWORD_INITIAL_STATE = {
  [FormFieldName.OldPassword]: '',
  [FormFieldName.Password]: '',
  [FormFieldName.PasswordConfirm]: '',
};

export const FORM_USER_INITIAL_STATE = {
  [FormFieldName.FirstName]: '',
  [FormFieldName.SecondName]: '',
  [FormFieldName.DisplayName]: '',
  [FormFieldName.Login]: '',
  [FormFieldName.Email]: '',
  [FormFieldName.Phone]: '',
};

export const FORM_CONFIGS = {
  info: {
    fields: PROFILE_INFO_FIELDS,
  },
  password: {
    fields: PROFILE_PASSWORD_FIELDS,
  },
} as const;

export const PROFILE_FORM_ID = 'profile-form';
