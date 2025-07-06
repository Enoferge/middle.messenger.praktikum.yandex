import { getChatUsers, getUserChats, removeUsersFromChat } from '@/services/chats';
import { FormFieldName } from '@/constants/formFields';

import { BaseUserCard, type BaseUserCardProps } from '../base-user-card';
import { ChatUsersList } from '../chat-users-list';

export interface RemoveUserCardProps extends BaseUserCardProps {
  chatId: number;
  users?: Array<{ id: number; login: string }>;
  onSuccess?: () => void;
}

export class RemoveUserCard extends BaseUserCard<RemoveUserCardProps>  {
  constructor(props: RemoveUserCardProps) {
    super({
      ...props,
      title: 'Remove user',
      submitButtonText: 'Remove',
      formId: 'remove-user-form',
      onSubmit: async (formData) => {
        await removeUsersFromChat({
          users: [Number(formData[FormFieldName.UserId])],
          chatId: props.chatId,
        });

        if (this.props.users?.length === 1 && formData[FormFieldName.UserId] === String(this.props.users[0].id)) {
          console.log('you removed yourself from the chat');
          getUserChats({ offset: '0', limit: '20' });
          window.store.set({
            activeChat: null,
          });
        }

      },
      customContent: new ChatUsersList({ users: props.users || [] }),
    });
  }

  async fetchUsers() {
    const users = await getChatUsers({ id: this.props.chatId, offset: 0, limit: 20 });
    this.setProps({ users });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(oldProps: RemoveUserCardProps, newProps: RemoveUserCardProps): boolean {
    if (oldProps.chatId !== newProps.chatId) {
      this.fetchUsers();
    }

    if (oldProps.users !== newProps.users) {
      this.updateCustomContent({ users: newProps.users });
    }

    return false;
  }
}
