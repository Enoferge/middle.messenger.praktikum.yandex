import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { AvatarActions } from '@/components/avatar-actions';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { Form } from '@/components/form';
import { FileUpload } from '@/components';

import template from './profile.hbs?raw';
import './styles.css';
import type { ProfilePageProps } from './types';
import { profilePagePropsByMode } from './constants';

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    const {
      formFields,
      formState,
      isFormReadonly,
      submitButtonText,
      isButtonDisabled,
      isFileError,
      filename,
    } = profilePagePropsByMode[props.mode];

    super('section', {
      ...props,
      class: 'profile-card',
      attrs: {
        role: 'profile-dialog',
        'aria-labelledby': 'profile-title',
      },
      children: {
        Avatar: new Avatar({
          src: '/assets/images/user1.png',
          alt: 'User avatar',
          size: 160,
        }),
        AvatarActions: new AvatarActions({
          mode: props.mode,
          onBackToProfile: () => this.setProps({ mode: 'READ' }),
          onChangeAvatar: () => this.setProps({ mode: 'CHANGE_AVATAR' }),
          onChangePassword: () => this.setProps({ mode: 'CHANGE_PASS' }),
          onSignOut: () => console.log('sign out'),
        }),
        Content: props.mode.startsWith('CHANGE_AVATAR')
          ? new FileUpload({ name: 'profile-avatar', error: isFileError ? 'Error while uploading, please try again' : '', filename })
          : new Form({
            formId: 'profile-form',
            formFields,
            formState,
            isFormReadonly,
          }),
        Footer: new Button({
          formId: props.mode === 'READ' ? undefined : 'profile-form',
          type: props.mode === 'READ' ? 'button' : 'submit',
          name: 'profile-main-button',
          text: submitButtonText,
          fullWidth: true,
          disabled: isButtonDisabled,
        }),
        CloseButton: new IconButton({
          iconName: 'close',
          variant: 'plain',
          onClick: () => console.log('onClose'),
        }),
      },
    });
  }

  render() {
    return template;
  }
}
