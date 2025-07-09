import type { Props } from '@/core/block/types';
import type { IconName } from '@/components/icon/types';

export interface MessageBubbleProps extends Props {
  id: string;
  text: string;
  time: string;
  status?: IconName;
  isIncoming: boolean;
}
