import { loginFields } from '../data/authFields';
import { registrationFields } from '../data/authFields';
import { AuthPage } from '../pages/auth';
import { ErrorPage } from '../pages/error';
import { HomePage } from '../pages/home';
import { prepareForm } from '../utils/form';
import { PAGE_NAMES } from './constants';
import type { PageData, PageName } from './types';

const currentPages = Object.values(PAGE_NAMES).map((page) => ({
  page,
  buttonText: `Page ${page}`,
}));

export const pages: Record<PageName, PageData> = {
  registration: {
    template: AuthPage,
    context: {
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
        page: PAGE_NAMES.LOGIN,
      },
    },
    mountCb: () => prepareForm('registration-form', console.log),
  },
  login: {
    template: AuthPage,
    context: {
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
  home: {
    template: HomePage,
    context: {
      pages: currentPages,
    },
  },
  500: {
    template: ErrorPage,
    context: {
      code: 500,
      message: 'Fixes are coming',
    },
  },
  400: {
    template: ErrorPage,
    context: {
      code: 400,
      message: 'Oops',
    },
  },
};
