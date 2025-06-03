import type { InputFieldProps } from '@/components/input-field/types';
import { FormFieldName } from '@/constants/formFields';

import type { ProfileMode, PropsByMode } from './types';

export const profileInfoFields: Array<InputFieldProps> = [
  {
    label: 'First name',
    name: FormFieldName.FirstName,
    type: 'text',
  },
  {
    label: 'Second name',
    name: FormFieldName.SecondName,
    type: 'text',
  },
  {
    label: 'Display name',
    name: FormFieldName.DisplayName,
    type: 'text',
  },
  {
    label: 'Login',
    name: FormFieldName.Login,
    type: 'text',
  },
  {
    label: 'Email',
    name: FormFieldName.Email,
    type: 'email',
  },
  {
    label: 'Phone',
    name: FormFieldName.Phone,
    type: 'tel',
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
  },
  {
    type: 'password',
    label: 'New password',
    name: FormFieldName.Password,
  },
  {
    type: 'password',
    label: 'Repeat password',
    name: FormFieldName.PasswordConfirm,
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
