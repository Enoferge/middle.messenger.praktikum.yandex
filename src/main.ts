import Router from '@/navigation/router';
import { ROUTER } from '@/navigation/constants';
import { Store, StoreEvents } from '@/core/store/store';
import type { State } from '@/core/store/types';

import './styles/variables.scss';
import './styles/base.scss';
import './styles/fonts.scss';
import './styles/ui';
import { registerHelpers } from './templates/helpers';
import { HomePage } from './pages/home';
import { SignInPage } from './pages/sign-in';
import { SignUpPage } from './pages/sign-up';
import { MessengerPage } from './pages/messenger';
import { ProfileSettingsPage } from './pages/profile-settings';

registerHelpers();

const APP_ROOT_ELEMENT_ID = '#app';

window.store = new Store({
  isFormLoading: false,
  formError: null,
  profileMode: 'READ',
  user: null,
});

window.store.on(StoreEvents.Updated, (prevState: State, newState: State) => {
  // console.log('prevState', prevState);
  // console.log('newState', newState);
  // console.log(window.store.state);
});

window.router = Router.getInstance(APP_ROOT_ELEMENT_ID);

window.router
  .use(ROUTER.home, HomePage)
  .use(ROUTER.signIn, SignInPage)
  .use(ROUTER.signUp, SignUpPage)
  .use(ROUTER.messenger, MessengerPage)
  .use(ROUTER.profileSettings, ProfileSettingsPage)
  .start();

// document.addEventListener('click', (e) => {
//   const { target } = e;

//   if (!(target instanceof HTMLLinkElement)) {
//     return;
//   }

//   if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
//     e.preventDefault();
//     const page = target.getAttribute('href')!.slice(1);
//     if (page && isPageName(page) && pages[page]) {
//       renderPage(page);
//       window.history.pushState(null, '', `/${page}`);
//     } else {
//       renderPage('404');
//       window.history.pushState(null, '', '404');
//     }
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {
//   renderPage(getCurrentPageNameFromPath());
// });

// window.addEventListener('popstate', () => {
//   renderPage(getCurrentPageNameFromPath());
// });
