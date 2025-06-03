import { ErrorPage } from '@/pages/error';
import { MessengerPage } from '@/pages/messenger';
import { AuthPage } from '@/pages/auth';
import { HomePage } from '@/pages/home';
import { signUpFields, signInFields } from '@/data/authFields';
import { messengerChats, activeChatMessages } from '@/data/messengerData';
import { ProfilePage } from '@/pages/profile';

import { PAGE_NAMES } from './constants';
import type { PageData, PageName } from './types';

const currentPages = Object.values(PAGE_NAMES).map((page) => ({
  page,
  linkText: `Page ${page}`,
}));

export const pages: Record<PageName, PageData> = {
  home: {
    pageBlock: new HomePage({ pages: currentPages }),
    layoutContext: {
      hideHomeButton: true,
    },
  },
  signIn: {
    pageBlock: new AuthPage({
      title: 'Sign in',
      formId: 'sign-in-form',
      formProps: {
        formFields: signInFields,
        formState: {
          login: '',
          password: '',
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
    }),
  },
  signUp: {
    pageBlock: new AuthPage({
      title: 'Sign up',
      formId: 'sign-up-form',
      formProps: {
        formFields: signUpFields,
        formState: {
          first_name: '',
          second_name: '',
          login: '',
          email: '',
          phone: '',
          password: '',
          password_confirm: '',
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
    }),
  },
  profileRead: {
    pageBlock: new ProfilePage({
      mode: 'READ',
    }),
  },
  profileEdit: {
    pageBlock: new ProfilePage({
      mode: 'EDIT',
    }),
  },
  profileChangePass: {
    pageBlock: new ProfilePage({
      mode: 'CHANGE_PASS',
    }),
  },
  profileChangeAvatar: {
    pageBlock: new ProfilePage({
      mode: 'CHANGE_AVATAR',
    }),
  },
  profileChangeAvatarError: {
    pageBlock: new ProfilePage({
      mode: 'CHANGE_AVATAR_ERROR',
    }),
  },
  profileChangeAvatarUploaded: {
    pageBlock: new ProfilePage({
      mode: 'CHANGE_AVATAR_UPLOADED',
    }),
  },
  500: {
    pageBlock: new ErrorPage({
      code: '500',
      message: 'Fixes are coming',
    }),
    layoutContext: {
      hideHomeButton: true,
    },
  },
  404: {
    pageBlock: new ErrorPage({
      code: '404',
      message: 'Oops, page not found!',
    }),
    layoutContext: {
      hideHomeButton: true,
    },
  },
  400: {
    pageBlock: new ErrorPage({
      code: '400',
      message: 'Oops!',
    }),
    layoutContext: {
      hideHomeButton: true,
    },
  },
  messenger: {
    pageBlock: new MessengerPage({
      chats: messengerChats,
      activeChatMessages,
    }),
  },
};
