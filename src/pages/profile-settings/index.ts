import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import { ProfileSettingsPageConnected } from './profile-settings-page-base';
import type { ProfilePageProps } from './types';

export class ProfileSettingsPage extends BasePageWithLayout<ProfilePageProps> {
  constructor() {
    super(ProfileSettingsPageConnected, {});
  }
}
