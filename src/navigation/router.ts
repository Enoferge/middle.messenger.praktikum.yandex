import { loginFields } from '../data/authFields';
import { registrationFields } from '../data/authFields';
import { AuthPage } from '../pages/auth';
import { HomePage } from '../pages/home';
import { prepareForm } from '../utils/form';
import type { AuthPageData } from './types';

// use AuthPageData for now
export const pages: Record<string, AuthPageData> = {
  registration: {
    template: AuthPage,
    cardContext: {
      title: 'Registration',
      formFields: registrationFields,
      formId: 'registration-form',
      submitAction: {
        name: 'register',
        text: 'Register',
      },
      secondaryAction: {
        name: 'register',
        text: 'Sign in',
        page: '''',
      },
    },
    mountCb: () => prepareForm('registration-form', console.log),
  },
  login: {
    template: AuthPage,
    cardContext: {
      title: 'Login',
      formFields: loginFields,
      formId: 'login-form',
      submitAction: {
        name: 'login',
        text: 'Sign in',
      },
      secondaryAction: {
        name: 'register',
        text: 'Register',
        page: PAGE_NAMES.REGISTRATION,
      },
    },
    mountCb: () => prepareForm('login-form', console.log),
  },
  home: { template: HomePage },
};
