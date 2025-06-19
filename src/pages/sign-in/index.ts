import { FormFieldName } from "@/constants/formFields";
import { PAGES } from "@/navigation/constants";

import { signInFields } from "../auth/constants";
import { AuthPage } from "../auth";
import { BasePageWithLayout } from "@/core/base-page-with-layout/base-page-with-layout";

export class SignInPage extends BasePageWithLayout {
  constructor() {
    const page = new AuthPage({
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
          link: PAGES.SIGN_UP.link,
          text: 'Sign up',
        },
      },
    })

    super(page)
  }
}
