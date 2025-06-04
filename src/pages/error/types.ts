import type { Props } from '@/core/block/types';

export interface ErrorPageProps extends Props {
  code: string;
  message: string;
}
