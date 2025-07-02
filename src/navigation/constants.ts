export enum ROUTER {
  home = '/home',
  signIn = '/',
  signUp = '/sign-up',
  messenger = '/messenger',
  profileSettings = '/settings',
}

export const PAGES = {
  HOME: { name: 'home', link: ROUTER.home },
  SIGN_UP: { name: 'signUp', link: ROUTER.signUp },
  SIGN_IN: { name: 'signIn', link: ROUTER.signIn },
  MESSENGER: { name: 'messenger', link: ROUTER.messenger },
  PROFILE_SETTINGS: { name: 'profileSettings', link: ROUTER.profileSettings },
  // 500: '500',
  // 400: '400',
  // 404: '404',
} as const;
