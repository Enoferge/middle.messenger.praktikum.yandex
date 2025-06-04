import type { InputFieldProps } from '@/components/input-field/types';
import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';

import type { ProfileMode, PropsByMode } from './types';

export const profileInfoFields: Array<InputFieldProps> = [
  {
    label: 'First name',
    name: FormFieldName.FirstName,
    type: 'text',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Second name',
    name: FormFieldName.SecondName,
    type: 'text',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Display name',
    name: FormFieldName.DisplayName,
    type: 'text',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Login',
    name: FormFieldName.Login,
    type: 'text',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Email',
    name: FormFieldName.Email,
    type: 'email',
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    label: 'Phone',
    name: FormFieldName.Phone,
    type: 'tel',
    fieldType: FORM_FIELD_TYPE.Input,
  },
];

export const profileInfoStateInitial = {
  [FormFieldName.FirstName]: 'Lana',
  [FormFieldName.SecondName]: 'Rodionova',
  [FormFieldName.DisplayName]: 'enoferge',
  [FormFieldName.Login]: 'svrodionova',
  [FormFieldName.Email]: 'niceemail@yandex.ru',
  [FormFieldName.Phone]: '7 999 888 77 66',
};

export const profilePasswordStateInitial = {
  [FormFieldName.OldPassword]: '',
  [FormFieldName.Password]: '',
  [FormFieldName.PasswordConfirm]: '',
};

export const profilePasswordFields = [
  {
    type: 'password',
    label: 'Old password',
    name: FormFieldName.OldPassword,
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    type: 'password',
    label: 'New password',
    name: FormFieldName.Password,
    fieldType: FORM_FIELD_TYPE.Input,
  },
  {
    type: 'password',
    label: 'Repeat password',
    name: FormFieldName.PasswordConfirm,
    fieldType: FORM_FIELD_TYPE.Input,
  },
];

export const profilePagePropsByMode: Record<ProfileMode, PropsByMode> = {
  READ: {
    submitButtonText: 'Edit',
    formFields: profileInfoFields,
    formState: profileInfoStateInitial,
    isFormReadonly: true,
    isButtonDisabled: false,
  },
  EDIT: {
    submitButtonText: 'Save',
    formFields: profileInfoFields,
    formState: profileInfoStateInitial,
    isButtonDisabled: false,
  },
  CHANGE_PASS: {
    submitButtonText: 'Save',
    formFields: profilePasswordFields,
    formState: profilePasswordStateInitial,
    isButtonDisabled: false,
  },
  CHANGE_AVATAR: {
    submitButtonText: 'Upload avatar',
    isFileError: false,
    isButtonDisabled: true,
  },
  CHANGE_AVATAR_ERROR: {
    submitButtonText: 'Upload avatar',
    isFileError: true,
    isButtonDisabled: true,
  },
  CHANGE_AVATAR_UPLOADED: {
    submitButtonText: 'Upload avatar',
    isFileError: false,
    isButtonDisabled: false,
    filename: 'avatar.png',
  },
};
