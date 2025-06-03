import './styles.css';

import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { IconButton } from '@/components/icon-button';
import { ChatItem } from '@/components/chat-item';
import { MessageBubble } from '@/components/message-bubble';

import template from './messenger.hbs?raw';
import './styles.css';
import type { MessengerPageProps } from './types';

export class MessengerPage extends Block<MessengerPageProps> {
  constructor(props: MessengerPageProps) {
    super('div', {
      ...props,
      class: 'messenger__wrapper',
      children: {
        Avatar: new Avatar({
          src: '/assets/images/user1.png',
          alt: 'User avatar',
          size: 60,
        }),
        ActiveChatAvatar: new Avatar({
          src: '/assets/images/user1.png',
          alt: 'Active user avatar',
          size: 60,
        }),
        SettingsButton: new IconButton({
          iconName: 'settings',
          variant: 'plain',
        }),
        FileButton: new IconButton({
          iconName: 'file',
          variant: 'plain',
        }),
        SendButton: new IconButton({
          iconName: 'send',
        }),
        chats: props.chats.map((chat) => new ChatItem(chat)),
        activeChatMessages: props.activeChatMessages.map((msg) => new MessageBubble(msg)),
      },
    });
  }

  render() {
    return template;
  }
}
