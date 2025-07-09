import { addUsersToChat } from '@/services/chats';
import { FormFieldName } from '@/constants/formFields';

import { UserCard, type UserCardProps } from '../user-card';

export class AddUserCard extends UserCard<UserCardProps> {
  constructor(props: UserCardProps) {
    super({
      ...props,
      title: 'Add user',
      submitButtonText: 'Add',
      formId: 'add-user-form',
      onSubmit: async (formData: Record<string, string>) => {
        await addUsersToChat({
          users: [Number(formData[FormFieldName.UserId])],
          chatId: props.chatId,
        });
      },
    });
  }
}
