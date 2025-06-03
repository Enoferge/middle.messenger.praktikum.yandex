import type { InputFieldProps } from '@/components/input-field/types';
import type { FormProps } from '@/components/form/types';

import type { ProfileMode } from './types';

export const profileInfoFields: Array<InputFieldProps> = [
  {
    label: 'First name',
    name: 'first_name',
    type: 'text',
  },
  {
    label: 'Second name',
    name: 'second_name',
    type: 'text',
  },
  {
    label: 'Display name',
    name: 'display_name',
    type: 'text',
  },
  {
    label: 'Login',
    name: 'login',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
  },
];

export const profileInfoStateInitial = {
  first_name: 'Lana',
  second_name: 'Rodionova',
  display_name: 'enoferge',
  login: 'svrodionova',
  email: 'niceemail@yandex.ru',
  phone: '7 999 888 77 66',
};

export const profilePasswordStateInitial = {
  old_password: '',
  password: '',
  password_confirm: '',
};

const commonPasswordField = {
  type: 'password',
};

export const profilePasswordFields = [
  {
    ...commonPasswordField,
    label: 'Old password',
    name: 'old_password',
  },
  {
    ...commonPasswordField,
    label: 'New password',
    name: 'password',
  },
  {
    ...commonPasswordField,
    label: 'Repeat password',
    name: 'password_confirm',
  },
];

type PropsByMode = {
  submitButtonText: string;
  formFields?: Array<InputFieldProps>;
  formState?: FormProps['formState'];
  isFormReadonly?: boolean;
  isFileError?: boolean
  isButtonDisabled?: boolean
  filename?: string
};

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
