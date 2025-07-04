import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';
import { ChatItem } from '@/components/chat-item';

import template from './chat-list.hbs?raw';
import type { ChatListItem } from '../../types';

export interface ChatListProps extends Props {
  chats: ChatListItem[];
  onChatItemClick?: (id: string) => void;
}

export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super('div', {
      chats: props.chats,
      onChatItemClick: props.onChatItemClick,
      children: {
        chats: props.chats.map((chat) => new ChatItem({
          ...chat,
          onClickChatItem: props.onChatItemClick,
        })),
      },
      class: 'messenger__chats-list',
    });
  }

  componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    if (oldProps.chats !== newProps.chats || oldProps.onChatItemClick !== newProps.onChatItemClick) {
      this.children.chats = newProps.chats.map((chat) => new ChatItem({
        ...chat,
        onClickChatItem: newProps.onChatItemClick,
      }));
      return true;
    }
    return false;
  }

  render() {
    return template;
  }
}
