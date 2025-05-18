import type { InputField } from '../components/input/types';

export const profileEditFields: Array<InputField> = [
  {
    label: 'First name',
    name: 'first_name',
    type: 'text',
    value: 'Lana',
  },
  {
    label: 'Second name',
    name: 'second_name',
    type: 'text',
    value: 'Rodionova',
  },
  {
    label: 'Display name',
    name: 'display_name',
    type: 'text',
    value: 'enoferge',
  },
  {
    label: 'Login',
    name: 'login',
    type: 'text',
    value: 'svrodionova',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    value: 'niceemail@yandex.ru',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    value: '+7 999 888 77 66',
  },
];

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
    name: 'oldPassword',
  },
  {
    ...commonPasswordField,
    label: 'New password',
    name: 'newPassword',
  },
  {
    ...commonPasswordField,
    label: 'Repeat password',
    name: 'repeatPassword',
  },
];
