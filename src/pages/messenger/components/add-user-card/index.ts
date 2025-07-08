import { addUsersToChat } from '@/services/chats';
import { FormFieldName } from '@/constants/formFields';

import { UserCard } from '../user-card';

export interface AddUserProps {
  chatId: number;
  onSuccess?: () => void;
}

export class AddUserCard extends UserCard {
  constructor(props: AddUserProps) {
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
