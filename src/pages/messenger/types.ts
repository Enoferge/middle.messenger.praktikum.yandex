import type { Props } from '@/core/block/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { ChatInfo, GetChatUsersResponseDataDto } from '@/api/chats';
import type { UserInfo } from '@/api/types';
import type { ChatListItem } from '@/types/messenger';

export interface MessengerCommonState {
  userChats?: ChatInfo[];
  activeChat?: ChatInfo;
  activeChatUsers?: GetChatUsersResponseDataDto[];
  userAvatarUrl?: string;
  user?: UserInfo | null;
}

export type MessengerPageState = MessengerCommonState

export interface MessengerPageProps extends MessengerCommonState, Props {
  chatListItems?: ChatListItem[];
  activeChatMessages?: Array<MessageBubbleProps>;
  onActiveChatChange?: (chat: ChatInfo) => void;
  clearActiveChat?: () => void;
  updateUserChat?: (chatId: number, updatedChatInfo: Partial<ChatInfo>) => void;
}
