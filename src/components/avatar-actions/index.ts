import { Block } from '@/core/block/block';
import { Button } from '@/components/button';

import template from './avatar-actions.hbs?raw';
import type { AvatarActionsProps } from './types';

function getButtons(props: AvatarActionsProps) {
  const buttons = [];

  if (['CHANGE_AVATAR', 'CHANGE_PASS'].includes(props.mode)) {
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

  return buttons;
}
export class AvatarActions extends Block<AvatarActionsProps> {
  constructor(props: AvatarActionsProps) {
    super('ul', {
      ...props,
      class: 'profile-card__avatar-actions',
      attrs: {
        role: 'list',
      },
      children: {
        Buttons: getButtons(props),
      },
    });
  }

  beforeRender(): void {
    this.children.Buttons = getButtons(this.props);
  }

  render() {
    return template;
  }
}
