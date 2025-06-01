import type { RawPropsWithChildren } from '@/core/block/types';

type IconName = 'file' | 'plus' | 'send' | 'upload' | 'close' | 'settings' | 'delivered' | 'seen';

export interface IconProps extends RawPropsWithChildren {
  name?: IconName;
  class?: string;
}
