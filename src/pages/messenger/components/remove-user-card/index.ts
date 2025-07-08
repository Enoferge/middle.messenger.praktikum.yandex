import { getUserChats, removeUsersFromChat } from '@/services/chats';
import { FormFieldName } from '@/constants/formFields';

import { UserCard, type UserCardProps } from '../user-card';
import { ChatUsersList } from '../chat-users-list';

export interface RemoveUserCardProps {
  chatId: number;
  users?: Array<{ id: number; login: string }>;
  onSuccess?: () => void;
}

export class RemoveUserCard extends UserCard {
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

        const users = this.props.users as RemoveUserCardProps['users'];

        if (users?.length === 1 && formData[FormFieldName.UserId] === String(users[0].id)) {
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

  componentDidUpdate(oldProps: RemoveUserCardProps & UserCardProps, newProps: RemoveUserCardProps & UserCardProps): boolean {
    if (oldProps.users !== newProps.users) {
      this.updateCustomContent({ users: newProps.users });
    }

    return false;
  }
}
