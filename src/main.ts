import Router from '@/navigation/router';
import { ROUTER } from '@/navigation/constants';
import { Store } from '@/core/store/store';

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
import { getUserInfo } from './services/auth';
import { Error400Page } from './pages/error/Error400Page';
import { Error404Page } from './pages/error/Error404Page';
import { Error500Page } from './pages/error/Error500Page';

registerHelpers();

const APP_ROOT_ELEMENT_ID = '#app';

window.store = new Store({
  profileMode: 'READ',
  user: null,
});

window.router = Router.getInstance(APP_ROOT_ELEMENT_ID);

window.router
  .use(ROUTER.home, HomePage)
  .use(ROUTER.signIn, SignInPage)
  .use(ROUTER.signUp, SignUpPage)
  .use(ROUTER.messenger, MessengerPage)
  .use(ROUTER.profileSettings, ProfileSettingsPage)
  .use(ROUTER.error400, Error400Page)
  .use(ROUTER.error404, Error404Page)
  .use(ROUTER.error500, Error500Page);

await getUserInfo();
window.router.start();
