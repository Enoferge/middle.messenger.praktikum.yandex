import type { RawPropsWithChildren } from '@/core/block/types';

export type IconName =
  | 'file'
  | 'plus'
  | 'send'
  | 'upload'
  | 'close'
  | 'settings'
  | 'delivered'
  | 'seen'
  | 'search';

export interface IconProps extends RawPropsWithChildren {
  name?: IconName;
}
