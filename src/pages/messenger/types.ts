import type { ChatItemInfo } from '../../components/chat-item/types';
import type { BaseContext } from '../../navigation/types';

interface Message {
  id: string
  isIncoming: boolean
  text: string
  time: string
  status?: string
}

export interface MessengerContext extends BaseContext {
  chats: Array<ChatItemInfo>
  activeChat?: {
    id: string
    name: string,
    messages: Array<Message>
  }
}
