import { Block } from '@/core/block/block';
import { connect } from '@/core/hoc/connect-to-store';
import { IconButton } from '@/components/icon-button';
import { MessageBubble } from '@/components/message-bubble';
import { FORM_FIELD_TYPE, FormFieldName } from '@/constants/formFields';
import { Form, Tooltip } from '@/components';
import isEqual from '@/utils/is-equal';
import { changeChatAvatar, getUserChatByTitle } from '@/services/chats';

import { AddUserCard } from '../add-user-card';
import { RemoveUserCard } from '../remove-user-card';
import template from './active-chat-container.hbs?raw';
import type { MessengerPageState } from '../../types';
import { activeChatMessages } from '../../constants';
import { ChatActions } from '../chat-actions';
import { UploadChatAvatarCard } from '../upload-chat-avatar';
import ActiveChatAvatar from '../active-chat-avatar';
import type { ActiveChatContainerProps } from './types';
import './styles.scss';

const mapStateToProps = (state: MessengerPageState) => ({
  activeChat: state.activeChat,
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
      },
    });

    this.children.SettingsButton = this.createSettingsButton();
  }

  componentDidMount() {
  }

  componentDidUpdate(oldProps: ActiveChatContainerProps, newProps: ActiveChatContainerProps): boolean {
    if (!isEqual(oldProps.activeChat || {}, newProps.activeChat || {})) {
      return true;
    }

    return false;
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
