import { FormFieldName } from '@/constants/formFields';
import { PAGES } from '@/navigation/constants';
import { createUser } from '@/services/auth';

import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import type { CreateUserRequestData } from '@/api/types';
import { signUpFields } from '../auth/constants';
import { AuthPage } from '../auth';
import type { AuthPageProps } from '../auth/types';

const initialSignUpFormState = {
  [FormFieldName.FirstName]: '',
  [FormFieldName.SecondName]: '',
  [FormFieldName.Login]: '',
  [FormFieldName.DisplayName]: '',
  [FormFieldName.Email]: '',
  [FormFieldName.Phone]: '',
  [FormFieldName.Password]: '',
  [FormFieldName.PasswordConfirm]: '',
};

export class SignUpPage extends BasePageWithLayout<AuthPageProps> {
  constructor() {
    super(AuthPage, {
      title: 'Sign up',
      formId: 'sign-up-form',
      formProps: {
        formFields: signUpFields,
        formState: initialSignUpFormState,
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
    }, { hideHomeButton: true });
  }
}
