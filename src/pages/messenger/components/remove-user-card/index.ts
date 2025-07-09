import { removeUsersFromChat } from '@/services/chats';
import { FormFieldName } from '@/constants/formFields';
import type { UserInfo } from '@/pages/profile-settings/types';

import { UserCard, type UserCardProps } from '../user-card';
import { ChatUsersList } from '../chat-users-list';

export interface RemoveUserCardProps extends UserCardProps {
  user?: UserInfo | null
  users?: Array<{ id: number; login: string }>;
  onLeaveChat?: () => void
}

export class RemoveUserCard extends UserCard<RemoveUserCardProps> {
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

        const { onLeaveChat } = this.props;

        if (formData[FormFieldName.UserId] === String(this.props.user?.id)) {
          console.log('you removed yourself from the chat');
          onLeaveChat?.();
        }
      },
      customContent: new ChatUsersList({ users: props.users || [] }),
    });
  }

  componentDidUpdate(oldProps: RemoveUserCardProps, newProps: RemoveUserCardProps): boolean {
    if (oldProps.users !== newProps.users) {
      this.updateCustomContent({ users: newProps.users });
    }

    return false;
  }
}
