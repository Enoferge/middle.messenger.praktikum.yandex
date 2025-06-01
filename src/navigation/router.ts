import { signUpFields, signInFields } from '../data/authFields';
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
import { messengerChats, activeChat } from '../data/messengerData';
import { PAGE_NAMES } from './constants';
import type { PageData, PageName } from './types';

const currentPages = Object.values(PAGE_NAMES).map((page) => ({
  page,
  buttonText: `Page ${page}`,
}));

export const pages: Record<PageName, PageData> = {
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
        formErrors: {
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
          name: 'sign_up',
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
        formErrors: {
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
          name: 'sign_in',
          text: 'Sign in',
        },
      },
    }),
  },

  // home: {
  //   template: new HomePage({}),
  //   context: {
  //     pages: currentPages,
  //   },
  //   layoutContext: {
  //     hideHomeButton: true,
  //   },
  // },
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
  // profileRead: {
  //   template: ProfilePage,
  //   context: {
  //     mode: 'READ',
  //     submitButtonText: 'Edit',
  //     formFields: profileReadFields,
  //     formId: 'profile-form',
  //   },
  // },
  // profileEdit: {
  //   template: ProfilePage,
  //   context: {
  //     mode: 'EDIT',
  //     submitButtonText: 'Save',
  //     formFields: profileEditFields,
  //     formId: 'profile-form',
  //   },
  // },
  // profileChangePass: {
  //   template: ProfilePage,
  //   context: {
  //     mode: 'CHANGE_PASS',
  //     submitButtonText: 'Save',
  //     formFields: profileChangePassFields,
  //     formId: 'profile-form',
  //   },
  // },
  // profileChangeAvatar: {
  //   template: ProfilePage,
  //   context: {
  //     ...profileChangeAvatarCommonContext,
  //     mode: 'CHANGE_AVATAR',
  //     isFormInvalid: true,
  //     fileData: {
  //       name: 'avatar',
  //     },
  //   },
  // },
  // profileChangeAvatarError: {
  //   template: ProfilePage,
  //   context: {
  //     ...profileChangeAvatarCommonContext,
  //     mode: 'CHANGE_AVATAR_ERROR',
  //     isFormInvalid: true,
  //     fileData: {
  //       name: 'avatar',
  //       error: 'Error while uploading, please try again',
  //     },
  //   },
  // },
  // profileChangeAvatarUploaded: {
  //   template: ProfilePage,
  //   context: {
  //     ...profileChangeAvatarCommonContext,
  //     mode: 'CHANGE_AVATAR_UPLOADED',
  //     fileData: {
  //       name: 'avatar',
  //       filename: 'avatar.png',
  //     },
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
