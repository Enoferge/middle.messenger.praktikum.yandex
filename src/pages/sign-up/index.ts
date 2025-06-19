import { FormFieldName } from "@/constants/formFields";
import { PAGE_NAMES } from "@/navigation/constants";

import { signUpFields } from "../auth/constants";
import { AuthPage } from "../auth";

export class SignUpPage extends AuthPage {
  constructor() {
    super({
      title: 'Sign up',
      formId: 'sign-up-form',
      formProps: {
        formFields: signUpFields,
        formState: {
          [FormFieldName.FirstName]: '',
          [FormFieldName.SecondName]: '',
          [FormFieldName.Login]: '',
          [FormFieldName.DisplayName]: '',
          [FormFieldName.Email]: '',
          [FormFieldName.Phone]: '',
          [FormFieldName.Password]: '',
          [FormFieldName.PasswordConfirm]: '',
        },
      },
      footerProps: {
        submitAction: {
          name: 'sign_up',
          text: 'Sign up',
        },
        secondaryAction: {
          link: PAGE_NAMES.SIGN_IN,
          text: 'Sign in',
        },
      },
    })
  }
}
