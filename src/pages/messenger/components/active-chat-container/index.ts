import { Block } from '@/core/block/block';
import { connect } from '@/core/hoc/connect-to-store';
import { IconButton } from '@/components/icon-button';
import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import { Form, Tooltip } from '@/components';
import isEqual from '@/utils/is-equal';
import { changeChatAvatar, getUserChatByTitle } from '@/services/chats';

import { chatWebSocketManager } from '@/services/chat-websocket';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import { AddUserCard } from '../add-user-card';
import { RemoveUserCard } from '../remove-user-card';
import template from './active-chat-container.hbs?raw';
import type { MessengerPageState } from '../../types';
import { ChatActions } from '../chat-actions';
import { UploadChatAvatarCard } from '../upload-chat-avatar';
import ActiveChatAvatar from '../active-chat-avatar';
import { MessagesContainer } from '../messages-container';
import type { ActiveChatContainerProps } from './types';
import './styles.scss';

const mapStateToProps = (state: MessengerPageState) => ({
  activeChat: state.activeChat,
  user: state.user || null,
});

class MessengerActiveChatContainer extends Block<ActiveChatContainerProps> {
  constructor(props?: ActiveChatContainerProps) {
    super('section', {
      ...props,
      class: 'messenger__section messenger__section_right',
      children: {
        ActiveChatAvatar: new ActiveChatAvatar({}),
        FileButton: new IconButton({
          iconName: 'file',
          variant: 'plain',
        }),
        SendButton: new IconButton({
          iconName: 'send',
          type: 'submit',
          form: 'message-form',
        }),
        MessagesContainer: new MessagesContainer({
          messages: [],
        }),
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
          onSubmit: async (formData) => {
            await this.handleSendMessage(formData[FormFieldName.Message]);
          },
        }),
      },
    });

    this.children.SettingsButton = this.createSettingsButton();
  }

  componentDidMount() {}

  componentWillUnmount() {
    chatWebSocketManager.disconnectFromChat();
  }

  componentDidUpdate(oldProps: ActiveChatContainerProps, newProps: ActiveChatContainerProps): boolean {
    if (!isEqual(oldProps.activeChat || {}, newProps.activeChat || {})) {
      this.handleActiveChatChange(newProps.activeChat);
      return true;
    }

    return false;
  }

  private async handleActiveChatChange(activeChat: ActiveChatContainerProps['activeChat']): Promise<void> {
    const messagesContainer = this.children.MessagesContainer as MessagesContainer;

    messagesContainer.setProps({ messages: [] });

    if (!activeChat?.id) {
      chatWebSocketManager.disconnectFromChat();
      return;
    }

    try {
      const { user } = this.props;
      console.log('User from store:', user);

      if (!user || !user.id) {
        console.error('User id was not found in store');
        return;
      }

      await chatWebSocketManager.connectToChat(activeChat.id, user.id, {
        onMessage: (message: MessageBubbleProps) => {
          console.log('chatWebSocketManager onMessage', message);
          this.handleNewMessage(message);
        },
        onOldMessages: (messages: MessageBubbleProps[]) => {
          console.log('onOldMessages', messages);
          this.handleOldMessages(messages);
        },
        onOpen: () => {
          console.log('chatWebSocketManager onOpen');
          chatWebSocketManager.getOldMessages();
        },
        onClose: () => {
          console.log('chatWebSocketManager onClose');
        },
        onError: (event) => {
          console.error('chatWebSocketManager onError', event);
        },
      });
    } catch (error) {
      console.error('Failed to connect to WebSocket', error);
    }
  }

  private handleNewMessage(message: MessageBubbleProps): void {
    const messagesContainer = this.children.MessagesContainer as MessagesContainer;
    messagesContainer.setProps({
      messages: [...(messagesContainer.props.messages || []), message],
    });
  }

  private handleOldMessages(messages: MessageBubbleProps[]): void {
    const messagesContainer = this.children.MessagesContainer as MessagesContainer;
    messagesContainer.setProps({
      messages: messages.reverse(),
    });
  }

  private async handleSendMessage(content: string): Promise<void> {
    if (!content.trim()) {
      return;
    }

    try {
      chatWebSocketManager.sendMessage(content);
    } catch (error) {
      console.error('failed to send message:', error);
    }
  }

  showAddUserModal() {
    const chatId = this.props.activeChat?.id;

    if (!chatId) {
      return;
    }

    const card = new AddUserCard({
      chatId,
      onSuccess: () => {
        this.props.hideModal?.();
      },
    });

    this.props.showModal?.(card);
  }

  showRemoveUserModal() {
    const chatId = this.props.activeChat?.id;

    if (!chatId) {
      return;
    }

    const card = new RemoveUserCard({
      chatId,
      onSuccess: () => {
        this.props.hideModal?.();
      },
    });

    this.props.showModal?.(card);
  }

  showUploadFileModal() {
    const chatId = this.props.activeChat?.id;

    if (!chatId) {
      return;
    }

    const card = new UploadChatAvatarCard({
      chatId,
      onSuccess: async () => {
        this.props.hideModal?.();
        const updatedChat = await getUserChatByTitle(this.props.activeChat?.title);

        if (updatedChat) {
          window.store.set({
            activeChat: updatedChat,
          });

          this.props.onActiveChatUpdate?.();
        }
      },
      onFileUpload: async (file: File) => {
        const formData = new FormData();
        formData.append('chatId', String(chatId));
        formData.append('avatar', file);
        await changeChatAvatar(formData);
      },
    });

    this.props.showModal?.(card);
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
            this.showAddUserModal?.();
          },
          onRemoveUser: () => {
            this.showRemoveUserModal?.();
          },
          onUploadFile: () => {
            this.showUploadFileModal?.();
          },
        }),
      },
    });
  }

  render() {
    return template;
  }
}

export default connect<ActiveChatContainerProps, MessengerPageState>(mapStateToProps)(MessengerActiveChatContainer);
