import { FormFieldName } from '@/constants/formFields';
import { PAGES } from '@/navigation/constants';

import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import { login } from '@/services/auth';
import type { LoginRequestData } from '@/api/types';
import { signInFields } from '../auth/constants';
import { AuthPage } from '../auth';

const testFields = {
  [FormFieldName.Login]: 'TestLoginSvr1',
  [FormFieldName.Password]: 'qwertyQWERTY1',
};
export class SignInPage extends BasePageWithLayout {
  constructor() {
    const page = new AuthPage({
      title: 'Sign in',
      formId: 'sign-in-form',
      formProps: {
        formFields: signInFields,
        formState: testFields,
        // formState: {
        //   [FormFieldName.Login]: '',
        //   [FormFieldName.Password]: '',
        // },
        onSubmit: async (form: Record<string, string>) => {
          // change types later
          login(form as LoginRequestData);
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
    });

    super(page);
  }
}
