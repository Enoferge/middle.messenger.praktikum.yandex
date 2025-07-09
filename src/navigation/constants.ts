export enum ROUTER {
  home = '/home',
  signIn = '/',
  signUp = '/sign-up',
  messenger = '/messenger',
  profileSettings = '/settings',
  error400 = '/400',
  error404 = '/404',
  error500 = '/500',
}

export const PAGES = {
  HOME: { name: 'home', link: ROUTER.home },
  SIGN_UP: { name: 'signUp', link: ROUTER.signUp },
  SIGN_IN: { name: 'signIn', link: ROUTER.signIn },
  MESSENGER: { name: 'messenger', link: ROUTER.messenger },
  PROFILE_SETTINGS: { name: 'profileSettings', link: ROUTER.profileSettings },
  ERROR_400: { name: 'error400', link: ROUTER.error400 },
  ERROR_404: { name: 'error404', link: ROUTER.error404 },
  ERROR_500: { name: 'error500', link: ROUTER.error500 },
} as const;
