import type { Props } from '@/core/block/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { ChatInfo, GetChatUsersResponseDataDto } from '@/api/chats';
import type { UserInfo } from '../profile-settings/types';

export interface ChatListItem {
  id: string;
  chatName?: string | null;
  chatAvatar?: string | null;
  lastMsgPreview?: string | null;
  unreadMsgCount?: number | null;
  lastMsgTime?: string | null;
}

export interface MessengerPageProps extends Props {
  userChats?: ChatInfo[];
  chatListItems?: ChatListItem[];
  activeChat?: ChatInfo;
  activeChatMessages?: Array<MessageBubbleProps>;
  chatUsers?: GetChatUsersResponseDataDto[];
  userAvatarUrl?: string;
  user?: UserInfo | null;

  onActiveChatChange?: (chat: ChatInfo) => void
  updateSpecificUserChat?: (chat: ChatInfo, idx: number) => void
}

export interface MessengerPageState {
  userChats?: ChatInfo[];
  activeChat?: ChatInfo;
  chatUsers?: ChatInfo[];
  userAvatarUrl?: string;
  user?: UserInfo | null;
}
