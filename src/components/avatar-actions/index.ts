import { Block } from '@/core/block/block';
import { Button } from '@/components/button';

import template from './avatar-actions.hbs?raw';
import type { AvatarActionsProps } from './types';

export class AvatarActions extends Block<AvatarActionsProps> {
  constructor(props: AvatarActionsProps) {
    const testButtons = AvatarActions.createButtons(props);

    super('ul', {
      ...props,
      class: 'profile-card__avatar-actions',
      attrs: {
        role: 'list',
      },
      children: {
        Buttons: testButtons,
      },
    });
  }

  static createButtons(props: AvatarActionsProps) {
    return ['CHANGE_AVATAR', 'CHANGE_PASS'].includes(props.mode)
      ? [new Button({ variant: 'plain', text: 'Back', onClick: props.onBackToProfile })]
      : [
        new Button({ variant: 'plain', text: 'Change avatar', onClick: props.onChangeAvatar }),
        new Button({ variant: 'plain', text: 'Change password', onClick: props.onChangePassword }),
        new Button({
          variant: 'plain', text: 'Sign out', isAccent: true, onClick: props.onSignOut,
        }),
      ];
  }

  componentDidUpdate(oldProps: AvatarActionsProps, newProps: AvatarActionsProps): boolean {
    if (oldProps.mode !== newProps.mode) {
      this.children.Buttons = AvatarActions.createButtons(newProps);
      return true;
    }
    return false;
  }

  render() {
    return template;
  }
}
