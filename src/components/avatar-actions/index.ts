import { Block } from '@/core/block/block';
import { Button } from '@/components/button';

import template from './avatar-actions.hbs?raw';
import type { AvatarActionsProps } from './types';

export class AvatarActions extends Block {
  constructor(props: AvatarActionsProps) {
    const buttons = [];

    if (props.mode === 'CHANGE_AVATAR') {
      buttons.push(
        new Button({
          variant: 'plain',
          text: 'Back',
          onClick: props.onBackToProfile,
        })
      );
    } else {
      buttons.push(
        new Button({
          variant: 'plain',
          text: 'Change avatar',
          onClick: props.onChangeAvatar,
        }),
        new Button({
          variant: 'plain',
          text: 'Change password',
          onClick: props.onChangePassword,
        }),
        new Button({
          variant: 'plain',
          text: 'Sign out',
          isAccent: true,
          onClick: props.onSignOut,
        })
      );
    }

    super('ul', {
      ...props,
      class: 'profile-card__avatar-actions',
      attrs: {
        role: 'list',
      },
      children: {
        Buttons: buttons,
      },
    });
  }

  render() {
    return template;
  }
}
