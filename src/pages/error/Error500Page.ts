import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import { ErrorPage } from './index';
import type { ErrorPageProps } from './types';

export class Error500Page extends BasePageWithLayout<ErrorPageProps> {
  constructor() {
    super(ErrorPage, { code: '500', message: 'Internal Server Error' });
  }
}
