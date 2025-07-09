import type { Props } from '@/core/block/types';

export interface ChatItemProps extends Props {
  id: string;
  contactName: string;
  contactAvatar?: string;
  lastMsgPreview?: string;
  unreadMsgCount?: number;
  lastMsgTime?: string;
}
