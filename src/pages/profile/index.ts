import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { AvatarActions } from '@/components/avatar-actions';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { Form } from '@/components/form';
import { FileUpload } from '@/components/file-upload';

import template from './profile.hbs?raw';
import './styles.css';
import type { ProfilePageProps } from './types';
import { profilePagePropsByMode } from './constants';

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    const { formFields, formState, isFormReadonly } = profilePagePropsByMode[props.mode];

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
        FormBlock: props.mode.startsWith('CHANGE_AVATAR')
          ? new FileUpload({ name: 'file_upload' })
          : new Form({
              formId: 'profile-form',
              formFields,
              formState,
              isFormReadonly,
            }),
        Footer: new Button({
          formId: 'profile-form',
          name: 'profile-save',
          type: props.mode === 'READ' ? 'button' : 'submit',
          text: 'FIRST TEXT',
          fullWidth: true,
          onClick: props.mode === 'READ' ? () => this.setProps({ mode: 'EDIT' }) : undefined,
        }),
        CloseButton: new IconButton({
          iconName: 'close',
          variant: 'plain',
          onClick: props.onClose,
        }),
      },
    });
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps) {
    if (oldProps.mode !== newProps.mode) {
      const { isFormReadonly } = profilePagePropsByMode[newProps.mode];

      (this.children.AvatarActions as Block).setProps({
        mode: newProps.mode,
      });

      // update form, footer button
      (this.children.Footer as Block).setProps({ text: 'SECOND TEXT' });

      this.children.FormBlock.setProps({
        isFormReadonly,
      });
    }

    return false;
  }

  render() {
    return template;
  }
}
