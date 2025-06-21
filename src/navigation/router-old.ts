// import { ErrorPage } from '@/pages/error';
// import { MessengerPage } from '@/pages/messenger';
// import { AuthPage } from '@/pages/auth';
// import { HomePage } from '@/pages/home';
// import { signUpFields, signInFields } from '@/pages/auth/constants';
// import { messengerChats, activeChatMessages } from '@/pages/messenger/constants';
// import { ProfilePage } from '@/pages/profile';
// import { FormFieldName } from '@/constants/formFields';
// import type { Block } from '@/core/block/block';

// import { PAGE_NAMES } from './constants';

// export interface PageData {
//   pageBlock: Block;
//   layoutContext?: {
//     hideHomeButton?: boolean;
//   };
// }

// export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];

// const currentPages = Object.values(PAGE_NAMES).map((page) => ({
//   page,
//   linkText: `Page ${page}`,
// }));

// export const pages: Record<PageName, PageData> = {
//   home: {
//     pageBlock: new HomePage({ pages: currentPages }),
//     layoutContext: {
//       hideHomeButton: true,
//     },
//   },
//   signIn: {
//     pageBlock: new AuthPage({
//       title: 'Sign in',
//       formId: 'sign-in-form',
//       formProps: {
//         formFields: signInFields,
//         formState: {
//           [FormFieldName.Login]: '',
//           [FormFieldName.Password]: '',
//         },
//       },
//       footerProps: {
//         submitAction: {
//           name: 'sign_in',
//           text: 'Sign in',
//         },
//         secondaryAction: {
//           link: PAGE_NAMES.SIGN_UP,
//           text: 'Sign up',
//         },
//       },
//     }),
//   },
//   signUp: {
//     pageBlock: new AuthPage({
//       title: 'Sign up',
//       formId: 'sign-up-form',
//       formProps: {
//         formFields: signUpFields,
//         formState: {
//           [FormFieldName.FirstName]: '',
//           [FormFieldName.SecondName]: '',
//           [FormFieldName.Login]: '',
//           [FormFieldName.DisplayName]: '',
//           [FormFieldName.Email]: '',
//           [FormFieldName.Phone]: '',
//           [FormFieldName.Password]: '',
//           [FormFieldName.PasswordConfirm]: '',
//         },
//       },
//       footerProps: {
//         submitAction: {
//           name: 'sign_up',
//           text: 'Sign up',
//         },
//         secondaryAction: {
//           link: PAGE_NAMES.SIGN_IN,
//           text: 'Sign in',
//         },
//       },
//     }),
//   },
//   profileRead: {
//     pageBlock: new ProfilePage({
//       mode: 'READ',
//     }),
//   },
//   profileEdit: {
//     pageBlock: new ProfilePage({
//       mode: 'EDIT',
//     }),
//   },
//   profileChangePass: {
//     pageBlock: new ProfilePage({
//       mode: 'CHANGE_PASS',
//     }),
//   },
//   profileChangeAvatar: {
//     pageBlock: new ProfilePage({
//       mode: 'CHANGE_AVATAR',
//     }),
//   },
//   profileChangeAvatarError: {
//     pageBlock: new ProfilePage({
//       mode: 'CHANGE_AVATAR_ERROR',
//     }),
//   },
//   profileChangeAvatarUploaded: {
//     pageBlock: new ProfilePage({
//       mode: 'CHANGE_AVATAR_UPLOADED',
//     }),
//   },
//   500: {
//     pageBlock: new ErrorPage({
//       code: '500',
//       message: 'Fixes are coming',
//     }),
//     layoutContext: {
//       hideHomeButton: true,
//     },
//   },
//   404: {
//     pageBlock: new ErrorPage({
//       code: '404',
//       message: 'Oops, page not found!',
//     }),
//     layoutContext: {
//       hideHomeButton: true,
//     },
//   },
//   400: {
//     pageBlock: new ErrorPage({
//       code: '400',
//       message: 'Oops!',
//     }),
//     layoutContext: {
//       hideHomeButton: true,
//     },
//   },
//   messenger: {
//     pageBlock: new MessengerPage({
//       chats: messengerChats,
//       activeChatContactName: 'Sakura',
//       activeChatMessages,
//     }),
//   },
// };
