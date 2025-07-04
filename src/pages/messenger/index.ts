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
import { createNewChat, getUserChats } from '@/services/chats';
import { Modal } from '@/components/modal';
import { Card } from '@/components/card';
import { FormFooter } from '@/components/form-footer';

import template from './messenger.hbs?raw';
import type { MessengerPageContext, MessengerPageProps, MessengerPageState } from './types';
import { activeChatMessages } from './constants';
import ChatList from './components/chat-list/chat-list';
import './styles.scss';

const mapStateToProps = (state: MessengerPageState) => ({
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
        Modal: new Modal({
          content: null,
        }),
        CreateNewChatButton: new IconButton({
          class: 'messenger__create-new-chat-button',
          iconName: 'plus',
          onClick: () => {
            this.showCreateChatModal();
          },
        }),
      },
    });
    (this.children.Modal as Modal).setProps({
      onOverlayClick: () => this.hideModal(),
    });
    (this.children.Modal as Modal).hide();
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

  showCreateChatModal() {
    console.log('showCreateChatModal');
    const form = new Form({
      formId: 'create-chat-form',
      formFields: [
        {
          name: FormFieldName.ChatTitle,
          label: 'Chat name',
          type: 'text',
          fieldType: 'input',
          value: '',
          placeholder: 'Enter new chat name',
        },
      ],
      formState: { [FormFieldName.ChatTitle]: '' },
      onSubmit: async (formData) => {
        await createNewChat({ title: formData[FormFieldName.ChatTitle] });
      },
      onSuccess: () => {
        this.hideModal();
        getUserChats({ offset: '0', limit: '20' });
      },
    });

    const card = new Card({
      title: 'Create new chat',
      children: {
        ContentBlock: form,
        FooterBlock: new FormFooter({
          submitAction: {
            name: 'create-chat-button',
            formId: 'create-chat-form',
            text: 'Create',
          },
        }),
      },
    });

    (this.children.Modal as Modal).setProps({ content: card });
    (this.children.Modal as Modal).show();
  }

  hideModal() {
    (this.children.Modal as Modal).hide();
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
