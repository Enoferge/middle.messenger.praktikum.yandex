import type { Props } from '@/core/block/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { GetChatsResponseData, GetChatUsersResponseDataDto } from '@/api/chats';

export interface ChatListItem {
  id: string;
  chatName?: string | null;
  chatAvatar?: string | null;
  lastMsgPreview?: string | null;
  unreadMsgCount?: number | null;
  lastMsgTime?: string | null;
}

export interface MessengerPageProps extends Props {
  userChats?: GetChatsResponseData[];
  chatListItems?: ChatListItem[];
  activeChat?: GetChatsResponseData;
  activeChatMessages?: Array<MessageBubbleProps>;
  chatUsers?: GetChatUsersResponseDataDto[];
  userAvatarUrl?: string;
}

export interface MessengerPageState {
  userChats?: GetChatsResponseData[];
  activeChat?: GetChatsResponseData;
  chatUsers?: GetChatUsersResponseDataDto[];
  userAvatarUrl?: string;
}
