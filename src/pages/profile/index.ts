import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { AvatarActions } from '@/components/avatar-actions';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { Form } from '@/components/form';
import { FileUpload } from '@/components/file-upload';

import template from './profile.hbs?raw';
import type { ProfilePageProps } from './types';
import './styles.css';

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    const isAvatarMode = [
      'CHANGE_AVATAR',
      'CHANGE_AVATAR_ERROR',
      'CHANGE_AVATAR_UPLOADED',
    ].includes(props.mode);

    const avatar = new Avatar({
      src: '/assets/images/user1.png',
      alt: 'User avatar',
      size: 160,
    });

    const avatarActions = new AvatarActions({
      mode: props.mode,
      onSignOut: props.onSignOut,
      onChangeAvatar: props.onChangeAvatar,
      onChangePassword: props.onChangePassword,
    });

    // TODO: use generic
    const formBlock = isAvatarMode
      ? new FileUpload({
          ...(props.fileData || { name: 'file_upload' }),
        })
      : new Form({
          formId: props.formId,
          formFields: props.formFields,
          formState: props.formState || {},
          formErrors: props.formErrors,
        });

    const submitButton = new Button({
      formId: props.formId,
      name: 'save',
      type: 'submit',
      text: props.submitButtonText,
      disabled: props.isFormInvalid,
      fullWidth: true,
    });

    const closeButton = new IconButton({
      iconName: 'close',
      variant: 'plain',
      onClick: props.onClose,
    });

    super('section', {
      ...props,
      class: 'profile-card',
      attrs: {
        role: 'profile-dialog',
        'aria-labelledby': 'profile-title',
      },
      children: {
        Avatar: avatar,
        AvatarActions: avatarActions,
        FormBlock: formBlock,
        Footer: submitButton,
        CloseButton: closeButton,
      },
    });
  }

  render() {
    return template;
  }
}
