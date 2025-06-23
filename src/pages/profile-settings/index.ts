import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import { ProfileSettingsPageWithRouter } from './profile-settings-page-base';

export class ProfileSettingsPage extends BasePageWithLayout {
  constructor() {
    const page = new ProfileSettingsPageWithRouter();

    super(page);
  }
}
