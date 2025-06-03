import { signUpFields, signInFields } from '../data/authFields';
import { AuthPage } from '../pages/auth';
import { HomePage } from '../pages/home';
import { ProfilePage } from '../pages/profile';
// import { ErrorPage } from '../pages/error';
// import { MessengerPage } from '../pages/messenger';
// import { messengerChats, activeChat } from '../data/messengerData';
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
  profile: {
    pageBlock: new ProfilePage({
      mode: 'READ',
      onClose: () => console.log('close'),
    }),
  },
  // 500: {
  //   template: ErrorPage,
  //   context: {
  //     code: '500',
  //     message: 'Fixes are coming',
  //   },
  //   layoutContext: {
  //     hideHomeButton: true,
  //   },
  // },
  // 400: {
  //   template: ErrorPage,
  //   context: {
  //     code: '400',
  //     message: 'Oops',
  //   },
  //   layoutContext: {
  //     hideHomeButton: true,
  //   },
  // },
  // 404: {
  //   template: ErrorPage,
  //   context: {
  //     code: '404',
  //     message: 'Oops, page not found',
  //   },
  //   layoutContext: {
  //     hideHomeButton: true,
  //   },
  // },
  // messenger: {
  //   template: MessengerPage,
  //   context: {
  //     chats: messengerChats,
  //     activeChat,
  //   },
  //   layoutContext: {
  //     hideHomeButton: true,
  //   },
  // },
};
