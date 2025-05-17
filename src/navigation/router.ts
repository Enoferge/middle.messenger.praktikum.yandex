import { loginFields } from '../data/authFields';
import { registrationFields } from '../data/authFields';
import { AuthPage } from '../pages/auth';
import { ErrorPage } from '../pages/error';
import { HomePage } from '../pages/home';
import { ProfilePage } from '../pages/profile';
import {
  profileChangePassFields,
  profileEditFields,
  profileReadFields,
} from '../data/profileFields';
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
  profileRead: {
    template: ProfilePage,
    context: {
      mode: 'READ',
      formFields: profileReadFields,
      formId: 'profile-form',
    },
  },
  profileEdit: {
    template: ProfilePage,
    context: {
      mode: 'EDIT',
      formFields: profileEditFields,
      formId: 'profile-form',
    },
  },
  profileChangePass: {
    template: ProfilePage,
    context: {
      mode: 'CHANGE_PASS',
      formFields: profileChangePassFields,
      formId: 'profile-form',
    },
  },
  profileChangeAvatar: {
    template: ProfilePage,
    context: {
      mode: 'CHANGE_AVATAR',
      isFormInvalid: true,
      fileData: {
        name: 'avatar',
      },
      formId: 'avatar-form',
    },
  },
  profileChangeAvatarError: {
    template: ProfilePage,
    context: {
      mode: 'CHANGE_AVATAR_ERROR',
      isFormInvalid: true,
      fileData: {
        name: 'avatar',
        error: 'Error while uploading, please try again',
      },
      formId: 'avatar-form',
    },
  },
  profileChangeAvatarUploaded: {
    template: ProfilePage,
    context: {
      mode: 'CHANGE_AVATAR_UPLOADED',
      fileData: {
        name: 'avatar',
        filename: 'avatar.png',
      },
      formId: 'avatar-form',
    },
  },
};
