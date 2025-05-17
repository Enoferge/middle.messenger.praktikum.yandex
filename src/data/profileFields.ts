import type { InputField } from '../components/input/types';

export const profileEditFields: Array<InputField> = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    value: 'Loresy',
  },
  {
    label: 'Name',
    name: 'first_name',
    type: 'text',
    value: 'Lana',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    value: '+7 999 888 77 66',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    value: 'niceemail@yandex.ru',
  },
];
// TODO: add the rest of fields

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
