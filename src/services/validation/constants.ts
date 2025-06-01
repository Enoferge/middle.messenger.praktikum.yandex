const nameValidator = {
  validator: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
  errorMsg:
    'Type any letters and hyphens, first letter must be uppercase. No spaces ot digits, no other special characters',
};
export const INPUT_VALIDATORS: Record<string, { validator: RegExp; errorMsg: string }> = {
  login: {
    validator: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
    errorMsg:
      'Type 3–20 characters, may include Latin letters, digits, hyphen and underscore. No no spaces, no other special characters',
  },
  password: {
    validator: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    errorMsg: 'Type 8–40 characters, at least one uppercase letter and one digit',
  },
  first_name: nameValidator,
  second_name: nameValidator,
  email: {
    validator: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    errorMsg:
      'Type any latin letters, digits, hyphens, underscores, dots. Must contain @, dot and at least one letter after dot',
  },
  phone: {
    validator: /^\+?\d{10,15}$/,
    errorMsg: 'Type 10-15 digits, may start with +',
  },
  message: {
    validator: /^.+$/,
    errorMsg: 'Message cannot be empty',
  },
};
