import type { RawPropsWithChildren } from '@/core/block/types';

export interface LinkProps extends RawPropsWithChildren {
  text: string;
  link?: string;
}
