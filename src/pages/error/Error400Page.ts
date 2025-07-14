import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import { ErrorPage } from './index';
import type { ErrorPageProps } from './types';

export class Error400Page extends BasePageWithLayout<ErrorPageProps> {
  constructor() {
    super(ErrorPage, { code: '400', message: 'Bad Request' });
  }
}
