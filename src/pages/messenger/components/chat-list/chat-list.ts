import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';
import { ChatItem } from '@/components/chat-item';
import template from './chat-list.hbs?raw';

export interface ChatListProps extends Props {
  chats: any[];
}

export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super('div', {
      chats: props.chats,
      children: {
        chats: props.chats.map((chat) => new ChatItem(chat)),
      },
      class: 'messenger__chats-list',
    });
  }

  componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.children.chats = newProps.chats.map((chat) => new ChatItem(chat));
      return true;
    }
    return false;
  }

  render() {
    return template;
  }
} 