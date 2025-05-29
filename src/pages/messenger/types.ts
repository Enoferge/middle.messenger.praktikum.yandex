import type { ChatItemInfo } from '../../components/chat-item/types';
import type { BaseContext } from '../../navigation/types';

export interface MessengerContext extends BaseContext {
  chats: Array<ChatItemInfo>
}
