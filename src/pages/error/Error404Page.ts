import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import { ErrorPage } from './index';
import type { ErrorPageProps } from './types';

export class Error404Page extends BasePageWithLayout<ErrorPageProps> {
  constructor() {
    super(ErrorPage, { code: '404', message: 'Page Not Found' });
  }
}
