import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import { Block } from '@/core/block/block';
import { connect } from '@/core/hoc/connect-to-store';
import { Avatar } from '@/components/avatar';
import { IconButton } from '@/components/icon-button';
import { MessageBubble } from '@/components/message-bubble';
import { InputField } from '@/components/input-field';
import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import { Form } from '@/components';
import isEqual from '@/utils/is-equal';
import { getUserChats } from '@/services/chats';

import template from './messenger.hbs?raw';
import type { MessengerPageContext, MessengerPageProps, MessengerPageState } from './types';
import { activeChatMessages } from './constants';
import ChatList from './components/chat-list/chat-list';
import './styles.scss';

const mapStateToProps = (state: any) => ({
  userChats: state.userChats || [],
});

class MessengerPageBase extends Block<MessengerPageContext> {
  constructor(props?: MessengerPageContext) {
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
        ChatList: new ChatList({
          chats: props?.userChats || [],
        }),
        activeChatMessages: activeChatMessages.map((msg) => new MessageBubble(msg)),
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
        CreateNewChatButton: new IconButton({
          class: 'messenger__create-new-chat-button',
          iconName: 'plus',
          onClick: () => {
            console.log('Create new chat');
          },
        }),
      },
    });
  }

  componentDidMount() {
    getUserChats({ offset: '0', limit: '20' });
  }

  componentDidUpdate(oldProps: MessengerPageContext, newProps: MessengerPageContext): boolean {
    if (!isEqual(oldProps.userChats || {}, newProps.userChats || {})) {
      if (this.children.ChatList) {
        (this.children.ChatList as ChatList).setProps({ chats: newProps.userChats || [] });
      }

      return false;
    }

    return false;
  }

  render() {
    return template;
  }
}

const MessengerPageBaseConnected = connect<MessengerPageProps, MessengerPageState>(mapStateToProps)(MessengerPageBase);


export class MessengerPage extends BasePageWithLayout {
  constructor() {
    super(MessengerPageBaseConnected, {});
  }
}
