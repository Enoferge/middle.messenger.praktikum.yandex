import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import { ProfileSettingsPageBase } from './profile-settings-page-base';

export class ProfileSettingsPage extends BasePageWithLayout {
  constructor() {
    const page = new ProfileSettingsPageBase();

    super(page);
  }
}
