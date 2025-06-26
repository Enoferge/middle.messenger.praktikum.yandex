import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import type { InputFieldProps } from '@/components/input-field/types';
import type { ProfileMode } from './types';

export const profileInfoFields: InputFieldProps[] = [
  { label: 'First name', name: FormFieldName.FirstName, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Second name', name: FormFieldName.SecondName, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Display name', name: FormFieldName.DisplayName, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Login', name: FormFieldName.Login, type: 'text', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Email', name: FormFieldName.Email, type: 'email', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Phone', name: FormFieldName.Phone, type: 'tel', fieldType: FORM_FIELD_TYPE.Input },
];

export const profilePasswordFields: InputFieldProps[] = [
  { label: 'Old password', name: FormFieldName.OldPassword, type: 'password', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'New password', name: FormFieldName.Password, type: 'password', fieldType: FORM_FIELD_TYPE.Input },
  { label: 'Repeat password', name: FormFieldName.PasswordConfirm, type: 'password', fieldType: FORM_FIELD_TYPE.Input },
];

export const PROFILE_FORMS = {
  info: {
    fields: profileInfoFields,
    initialState: {},
  },
  password: {
    fields: profilePasswordFields,
    initialState: {
      [FormFieldName.OldPassword]: '',
      [FormFieldName.Password]: '',
      [FormFieldName.PasswordConfirm]: '',
    },
  },
} as const;

export const PROFILE_MODE_UI: Record<ProfileMode, {
  submitText: string;
  showForm?: boolean;
  showFileUpload?: boolean;
  isReadonly?: boolean;
  isButtonDisabled?: boolean;
  fileError?: boolean;
  filename?: string;
}> = {
  READ: { submitText: 'Edit', showForm: true, isReadonly: true },
  EDIT: { submitText: 'Save', showForm: true },
  CHANGE_PASS: { submitText: 'Save', showForm: true },
  CHANGE_AVATAR: { submitText: 'Upload avatar', showFileUpload: true, isButtonDisabled: true },
  CHANGE_AVATAR_ERROR: { submitText: 'Upload avatar', showFileUpload: true, fileError: true, isButtonDisabled: true },
  CHANGE_AVATAR_UPLOADED: { submitText: 'Upload avatar', showFileUpload: true, isButtonDisabled: false, filename: 'avatar.png' },
};
