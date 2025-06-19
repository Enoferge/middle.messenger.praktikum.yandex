import { FormFieldName } from "@/constants/formFields";
import { PAGE_NAMES } from "@/navigation/constants";

import { signInFields } from "../auth/constants";
import { AuthPage } from "../auth";

export class SignInPage extends AuthPage {
  constructor() {
    super({
      title: 'Sign in',
      formId: 'sign-in-form',
      formProps: {
        formFields: signInFields,
        formState: {
          [FormFieldName.Login]: '',
          [FormFieldName.Password]: '',
        },
      },
      footerProps: {
        submitAction: {
          name: 'sign_in',
          text: 'Sign in',
        },
        secondaryAction: {
          link: PAGE_NAMES.SIGN_UP,
          text: 'Sign up',
        },
      },
    })
  }
}
