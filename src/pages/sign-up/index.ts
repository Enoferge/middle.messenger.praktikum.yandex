import { FormFieldName } from '@/constants/formFields';
import { PAGES } from '@/navigation/constants';
import { createUser } from '@/services/auth';

import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import type { CreateUserRequestData } from '@/api/types';
import { signUpFields } from '../auth/constants';
import { AuthPage } from '../auth';

const testFields = {
  [FormFieldName.FirstName]: 'TestFirst',
  [FormFieldName.SecondName]: 'TestSecond',
  [FormFieldName.Login]: 'TestLoginSvr1',
  [FormFieldName.DisplayName]: 'TestDisplaySvr1',
  [FormFieldName.Email]: 'test-email-svr1@yandex.ru',
  [FormFieldName.Phone]: '+79998887766',
  [FormFieldName.Password]: 'qwertyQWERTY1',
  [FormFieldName.PasswordConfirm]: 'qwertyQWERTY1',
};

export class SignUpPage extends BasePageWithLayout {
  constructor() {
    const page = new AuthPage({
      title: 'Sign up',
      formId: 'sign-up-form',
      formProps: {
        formFields: signUpFields,
        formState: testFields,
        // formState: {
        //   [FormFieldName.FirstName]: '',
        //   [FormFieldName.SecondName]: '',
        //   [FormFieldName.Login]: '',
        //   [FormFieldName.DisplayName]: '',
        //   [FormFieldName.Email]: '',
        //   [FormFieldName.Phone]: '',
        //   [FormFieldName.Password]: '',
        //   [FormFieldName.PasswordConfirm]: '',
        // },
        onSubmit: async (form: Record<string, string>) => createUser(form as CreateUserRequestData),
      },
      footerProps: {
        submitAction: {
          name: 'sign_up',
          text: 'Sign up',
        },
        secondaryAction: {
          link: PAGES.SIGN_IN.link,
          text: 'Sign in',
        },
      },
    });

    super(page);
  }
}
