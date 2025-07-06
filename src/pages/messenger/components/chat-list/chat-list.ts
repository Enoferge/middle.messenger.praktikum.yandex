import { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

import template from './chat-list.hbs?raw';
import { ChatItem } from '../chat-item';
import type { ChatListItem } from '../../types';
import isEqual from '@/utils/is-equal';

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
    if (oldProps.chats?.length !== newProps.chats?.length) {
      this.children.chats = newProps.chats.map((chat) => new ChatItem({
        ...chat,
        onClickChatItem: newProps.onChatItemClick,
      }));
      return true;
    }

    for (let i = 0; i < oldProps.chats.length; i++) {
      if (!isEqual(oldProps.chats[i], newProps.chats[i])) {
        (this.children.chats[i] as ChatItem).setProps({
          ...newProps.chats[i],
          onClickChatItem: newProps.onChatItemClick,
        })
      }
    }

    return false;
  }

  render() {
    return template;
  }
}
