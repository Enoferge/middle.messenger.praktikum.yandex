import { FormFieldName } from '@/constants/formFields';

const nameValidator = {
  validator: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
  errorMsg: 'Type any letters and hyphens, first letter must be uppercase. No spaces ot digits, no other special characters',
};

const displayNameValidator = {
  validator: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
  errorMsg: 'Type 3–20 characters, may include Latin letters, digits, hyphen and underscore. No no spaces, no other special characters',
};

export const INPUT_VALIDATORS: Record<string, { validator: RegExp; errorMsg: string }> = {
  [FormFieldName.Login]: displayNameValidator,
  [FormFieldName.DisplayName]: displayNameValidator,
  [FormFieldName.Password]: {
    validator: /^(?=.*[A-Z])(?=.*\d)[^\s]{8,40}$/,
    errorMsg: 'Type 8–40 characters, at least one uppercase letter and one digit',
  },
  [FormFieldName.OldPassword]: {
    validator: /^.+$/,
    errorMsg: 'Old password is required',
  },
  [FormFieldName.FirstName]: nameValidator,
  [FormFieldName.SecondName]: nameValidator,
  [FormFieldName.Email]: {
    validator: /^[a-z0-9._%+-]+@([a-z0-9-]*[a-z]+[a-z0-9-]*)+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i,
    errorMsg:
      'Type any latin letters, digits, hyphens, underscores, dots. Must contain @, dot and at least one letter after dot',
  },
  [FormFieldName.Phone]: {
    validator: /^\+?\d{10,15}$/,
    errorMsg: 'Type 10-15 digits, may start with +',
  },
  [FormFieldName.Message]: {
    validator: /^.+$/,
    errorMsg: 'Message cannot be empty',
  },
  [FormFieldName.ChatTitle]: {
    validator: /^.+$/,
    errorMsg: 'Chat title cannot be empty',
  },
};
