import { signInFields, signUpFields } from '../data/authFields';
import { AuthPage } from '../pages/auth';
import { ErrorPage } from '../pages/error';
import { HomePage } from '../pages/home';
import { ProfilePage } from '../pages/profile';
import { MessengerPage } from '../pages/messenger';
import {
  profileChangePassFields,
  profileEditFields,
  profileReadFields,
  profileChangeAvatarCommonContext,
} from '../data/profileFields';
import { PAGE_NAMES } from './constants';
import type { PageData, PageName } from './types';

const currentPages = Object.values(PAGE_NAMES).map((page) => ({
  page,
  buttonText: `Page ${page}`,
}));

export const pages: Record<PageName, PageData> = {
  signUp: {
    template: AuthPage,
    context: {
      title: 'Sign up',
      formFields: signUpFields,
      formId: 'sign-up-form',
      submitAction: {
        name: 'sign_up',
        text: 'Sign up',
      },
      secondaryAction: {
        name: 'sign_in',
        text: 'Sign in',
        page: PAGE_NAMES.SIGN_IN,
      },
    },
  },
  signIn: {
    template: AuthPage,
    context: {
      title: 'Sign in',
      formFields: signInFields,
      formId: 'sign-in-form',
      submitAction: {
        name: 'sign_in',
        text: 'Sign in',
      },
      secondaryAction: {
        name: 'sign_up',
        text: 'Sign up',
        page: PAGE_NAMES.SIGN_IN,
      },
    },
  },
  home: {
    template: HomePage,
    context: {
      pages: currentPages,
    },
    layoutContext: {
      hideHomeButton: true,
    }
  },
  500: {
    template: ErrorPage,
    context: {
      code: "500",
      message: 'Fixes are coming',
    },
    layoutContext: {
      hideHomeButton: true,
    }
  },
  400: {
    template: ErrorPage,
    context: {
      code: "400",
      message: 'Oops',
    },
    layoutContext: {
      hideHomeButton: true,
    }
  },
  404: {
    template: ErrorPage,
    context: {
      code: "404",
      message: 'Oops, page not found',
    },
    layoutContext: {
      hideHomeButton: true,
    }
  },
  profileRead: {
    template: ProfilePage,
    context: {
      mode: 'READ',
      submitButtonText: 'Edit',
      formFields: profileReadFields,
      formId: 'profile-form',
    },
  },
  profileEdit: {
    template: ProfilePage,
    context: {
      mode: 'EDIT',
      submitButtonText: 'Save',
      formFields: profileEditFields,
      formId: 'profile-form',
    },
  },
  profileChangePass: {
    template: ProfilePage,
    context: {
      mode: 'CHANGE_PASS',
      submitButtonText: 'Save',
      formFields: profileChangePassFields,
      formId: 'profile-form',
    },
  },
  profileChangeAvatar: {
    template: ProfilePage,
    context: {
      ...profileChangeAvatarCommonContext,
      mode: 'CHANGE_AVATAR',
      isFormInvalid: true,
      fileData: {
        name: 'avatar',
      },
    },
  },
  profileChangeAvatarError: {
    template: ProfilePage,
    context: {
      ...profileChangeAvatarCommonContext,
      mode: 'CHANGE_AVATAR_ERROR',
      isFormInvalid: true,
      fileData: {
        name: 'avatar',
        error: 'Error while uploading, please try again',
      },
    },
  },
  profileChangeAvatarUploaded: {
    template: ProfilePage,
    context: {
      ...profileChangeAvatarCommonContext,
      mode: 'CHANGE_AVATAR_UPLOADED',
      fileData: {
        name: 'avatar',
        filename: 'avatar.png',
      },
    },
  },
  messenger: {
    template: MessengerPage,
  },
};
