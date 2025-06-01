export const INPUT_VALIDATORS: Record<string, { validator: RegExp; errorMsg: string }> = {
  login: {
    validator: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
    errorMsg:
      '3–20 characters, may include Latin letters, digits, hyphen and underscore. No no spaces, no other special characters',
  },
  password: {
    validator: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    errorMsg: '8–40 characters, at least one uppercase letter and one digit',
  },
};
