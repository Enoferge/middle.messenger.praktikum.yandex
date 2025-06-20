import './styles.scss';

import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { IconButton } from '@/components/icon-button';
import { ChatItem } from '@/components/chat-item';
import { MessageBubble } from '@/components/message-bubble';
import { InputField } from '@/components/input-field';
import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import { Form } from '@/components';

import template from './messenger.hbs?raw';
import type { MessengerPageProps } from './types';
import { activeChatMessages, messengerChats } from './constants';

export class MessengerPageBase extends Block<MessengerPageProps> {
  constructor() {
    const props = {
      chats: messengerChats,
      activeChatContactName: 'Sakura',
      activeChatMessages,
    };

    super('div', {
      ...props,
      class: 'messenger messenger__wrapper',
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
          type: 'submit',
          form: 'message-form',
        }),
        Search: new InputField({
          name: 'search', type: 'search', placeholder: 'Search in chats...', fieldType: FORM_FIELD_TYPE.Input,
        }),
        chats: props.chats.map((chat) => new ChatItem(chat)),
        activeChatMessages: props.activeChatMessages.map((msg) => new MessageBubble(msg)),
        MessageForm: new Form({
          formId: 'message-form',
          formFields: [{
            name: FormFieldName.Message,
            value: '',
            placeholder: 'Type your message here...',
            fieldType: FORM_FIELD_TYPE.Textarea,
          }],
          formState: {
            [FormFieldName.Message]: '',
          },
        }),
      },
    });
  }

  render() {
    return template;
  }
}
