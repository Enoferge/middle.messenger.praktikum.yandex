import type { PageName } from '../../navigation/types';

export interface HomeContext {
  pages?: Array<{ page: PageName; buttonText: string }>;
}
