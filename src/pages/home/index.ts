import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import { HomePageBase } from './home-page-base';

export class HomePage extends BasePageWithLayout {
  constructor() {
    super(HomePageBase, {}, { hideHomeButton: true });
  }
}
