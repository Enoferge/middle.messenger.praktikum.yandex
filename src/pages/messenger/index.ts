import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import { Block } from '@/core/block/block';
import { connect } from '@/core/hoc/connect-to-store';
import { Avatar } from '@/components/avatar';
import { IconButton } from '@/components/icon-button';
import { MessageBubble } from '@/components/message-bubble';
import { InputField } from '@/components/input-field';
import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import { Form, Tooltip } from '@/components';
import isEqual from '@/utils/is-equal';
import { createNewChat, getUserChats, mapApiChatsToChatListItems } from '@/services/chats';
import { Modal } from '@/components/modal';
import { Card } from '@/components/card';
import { FormFooter } from '@/components/form-footer';
import type { GetChatsResponseData } from '@/api/chats';

import { AddUserCard } from './components/add-user-card';
import { RemoveUserCard } from './components/remove-user-card';
import template from './messenger.hbs?raw';
import type { MessengerPageProps, MessengerPageState } from './types';
import { activeChatMessages } from './constants';
import ChatList from './components/chat-list/chat-list';
import './styles.scss';
import { ChatActions } from './components/chat-actions';

const mapStateToProps = (state: MessengerPageState) => ({
  userChats: state.userChats || [],
  chatListItems: mapApiChatsToChatListItems(state.userChats || []),
  activeChat: state.activeChat,
});

class MessengerPageBase extends Block<MessengerPageProps> {
  constructor(props?: MessengerPageProps) {
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
          chats: props?.chatListItems || [],
          onChatItemClick: (id: string) => {
            const chat = this.props?.userChats?.find((c: GetChatsResponseData) => String(c.id) === id);
            window.store.set({
              activeChat: chat,
            });
            console.log(window.store.getState());
          },
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

    this.children.SettingsButton = this.createSettingsButton();
  }

  componentDidMount() {
    getUserChats({ offset: '0', limit: '20' });
  }

  componentDidUpdate(oldProps: MessengerPageProps, newProps: MessengerPageProps): boolean {
    if (!isEqual(oldProps.chatListItems || {}, newProps.chatListItems || {})) {
      if (this.children.ChatList) {
        (this.children.ChatList as ChatList).setProps({ chats: newProps.chatListItems || [] });
      }

      return false;
    }

    if (!isEqual(oldProps.activeChat || {}, newProps.activeChat || {})) {
      // extract right content not to rerender whole page
      return true;
    }

    return false;
  }

  showCreateChatModal() {
    const form = new Form({
      formId: 'create-chat-form',
      formFields: [
        {
          name: FormFieldName.ChatTitle,
          label: 'Chat title',
          type: 'text',
          fieldType: 'input',
          value: '',
          placeholder: 'Enter new chat title',
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

    this.showModal(card);
  }

  hideModal() {
    (this.children.Modal as Modal).dispose();
  }

  showModal(content: Block) {
    (this.children.Modal as Modal).setProps({ content });
    (this.children.Modal as Modal).show();
  }

  showAddUserModal() {
    const chatId = this.props.activeChat?.id;
    if (!chatId) {
      return;
    }

    const card = new AddUserCard({
      chatId,
      onSuccess: () => {
        this.hideModal();
      },
    });

    this.showModal(card);
  }

  showRemoveUserModal() {
    const chatId = this.props.activeChat?.id;
    if (!chatId) {
      return;
    }

    const card = new RemoveUserCard({
      chatId,
      onSuccess: () => {
        this.hideModal();
      },
    });

    this.showModal(card);
  }

  createSettingsButton() {
    return new Tooltip({
      children: {
        Trigger: new IconButton({
          iconName: 'settings',
          variant: 'plain',
        }),
        Content: new ChatActions({
          onAddUser: () => {
            this.showAddUserModal();
          },
          onRemoveUser: () => {
            this.showRemoveUserModal();
          },
        }),
      },
    });
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
