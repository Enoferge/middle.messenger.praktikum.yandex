import type { BaseContext, PageName } from '../../navigation/types';

export interface HomeContext extends BaseContext {
  pages?: Array<{ page: PageName; buttonText: string }>;
}
