import { addUsersToChat } from '@/services/chats';
import { FormFieldName } from '@/constants/formFields';

import { BaseUserCard, type BaseUserCardProps } from '../base-user-card';

export interface AddUserCardProps extends BaseUserCardProps {
  chatId: number;
  onSuccess?: () => void;
}

export class AddUserCard extends BaseUserCard<AddUserCardProps> {
  constructor(props: AddUserCardProps) {
    super({
      ...props,
      title: 'Add user',
      submitButtonText: 'Add',
      formId: 'add-user-form',
      onSubmit: async (formData) => {
        await addUsersToChat({
          users: [Number(formData[FormFieldName.UserId])],
          chatId: props.chatId,
        });
      },
    });
  }
}
