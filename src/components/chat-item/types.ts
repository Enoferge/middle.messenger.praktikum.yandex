import type { Props } from '@/core/block/types';

export interface ChatItemProps extends Props {
  id: string;
  chatName?: string;
  chatAvatar?: string;
  lastMsgPreview?: string;
  unreadMsgCount?: number;
  lastMsgTime?: string;
}
