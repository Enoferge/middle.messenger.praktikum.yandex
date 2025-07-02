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

registerHelpers();

const APP_ROOT_ELEMENT_ID = '#app';

// TODO: refac
window.store = new Store({
  isFormLoading: false,
  formError: null,
  profileMode: 'READ',
  user: null,
});

window.router = Router.getInstance(APP_ROOT_ELEMENT_ID);

window.router
  .use(ROUTER.home, HomePage)
  .use(ROUTER.signIn, SignInPage)
  .use(ROUTER.signUp, SignUpPage)
  .use(ROUTER.messenger, MessengerPage)
  .use(ROUTER.profileSettings, ProfileSettingsPage);

await getUserInfo();
window.router.start();
