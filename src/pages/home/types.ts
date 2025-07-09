import type { RawPropsWithChildren } from '@/core/block/types';
import type { PageName } from '@/navigation/types';

export interface HomePageProps extends RawPropsWithChildren {
  pages?: Array<{ page: PageName; linkText: string }>;
}
