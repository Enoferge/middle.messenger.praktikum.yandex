export enum ROUTER {
  home = '/home',
  signIn = '/',
  signUp = '/sign-up',
}

export const PAGES = {
  HOME: { name: 'home', link: ROUTER.home},
  SIGN_UP: { name: 'signUp', link: ROUTER.signUp},
  SIGN_IN: { name: 'signIn', link:  ROUTER.signIn},
  // PROFILE_READ: 'profileRead',
  // PROFILE_EDIT: 'profileEdit',
  // PROFILE_CHANGE_PASS: 'profileChangePass',
  // PROFILE_CHANGE_AVATAR: 'profileChangeAvatar',
  // PROFILE_CHANGE_AVATAR_ERROR: 'profileChangeAvatarError',
  // PROFILE_CHANGE_AVATAR_UPLOADED: 'profileChangeAvatarUploaded',
  // MESSENGER: 'messenger',
  // 500: '500',
  // 400: '400',
  // 404: '404',
} as const;
