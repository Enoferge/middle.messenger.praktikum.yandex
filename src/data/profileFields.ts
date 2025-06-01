import type { InputFieldProps } from '@/components/input-field/types';

export const profileEditFields: Array<InputFieldProps> = [
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

export const profileFormStateInitial = {
  first_name: 'Lana',
  second_name: 'Rodionova',
  display_name: 'enoferge',
  login: 'svrodionova',
  email: 'niceemail@yandex.ru',
  phone: '7 999 888 77 66',
};

export const profileReadFields = profileEditFields.map((field) => ({ ...field, readonly: true }));

const commonPasswordField = {
  type: 'password',
  minlength: 8,
  value: 'qwerty678',
};

export const profileChangePassFields = [
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

export const profileChangeAvatarCommonContext = {
  submitButtonText: 'Upload avatar',
  formId: 'avatar-form',
};
