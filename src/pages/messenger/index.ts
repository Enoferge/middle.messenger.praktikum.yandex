import './styles.css';

import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { IconButton } from '@/components/icon-button';
import { ChatItem } from '@/components/chat-item';
import { MessageBubble } from '@/components/message-bubble';

import { TextareaField } from '@/components/textarea/textarea-field';
import { InputField } from '@/components/input-field';
import template from './messenger.hbs?raw';
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
        Search: new InputField({ name: 'search', type: 'search' }),
        chats: props.chats.map((chat) => new ChatItem(chat)),
        activeChatMessages: props.activeChatMessages.map((msg) => new MessageBubble(msg)),
        MessageField: new TextareaField({ placeholder: 'Type your message here' }),
      },
    });
  }

  render() {
    return template;
  }
}
