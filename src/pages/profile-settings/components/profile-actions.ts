import { Block } from '@/core/block/block';
import { Button } from '@/components/button';
import type { Props } from '@/core/block/types';
import { connect } from '@/core/hoc/connect-to-store';
import type { ProfileSettingsState } from '@/types/profile';

export interface ProfileActionsProps extends Props {
  onBackToProfile: () => void;
  onSignOut: () => void;
  onChangeAvatar: () => void;
  onChangePassword: () => void;
}

type ProfileActionsState = Pick<ProfileSettingsState, 'profileMode'>
type ProfileActionsStateProps = ProfileActionsState
type ProfileActionsUnitedProps = ProfileActionsProps & ProfileActionsStateProps

const mapStateToProps = (state: ProfileActionsState) => ({
  profileMode: state.profileMode,
});

class ProfileActions extends Block<ProfileActionsProps> {
  constructor(props: ProfileActionsProps) {
    super('ul', {
      ...props,
      class: 'profile-card__avatar-actions',
      attrs: {
        role: 'list',
      },
      children: {
        Buttons: ProfileActions.createButtons(props as ProfileActionsUnitedProps),
      },
    });
  }

  static createButtons(props: ProfileActionsUnitedProps) {
    return ['CHANGE_AVATAR', 'CHANGE_PASS'].includes(props.profileMode)
      ? [new Button({ variant: 'plain', text: 'Back', onClick: props.onBackToProfile })]
      : [
        new Button({ variant: 'plain', text: 'Change avatar', onClick: props.onChangeAvatar }),
        new Button({ variant: 'plain', text: 'Change password', onClick: props.onChangePassword }),
        new Button({
          variant: 'plain', text: 'Sign out', isAccent: true, onClick: props.onSignOut,
        }),
      ];
  }

  componentDidUpdate(oldProps: ProfileActionsUnitedProps, newProps: ProfileActionsUnitedProps): boolean {
    if (oldProps.profileMode !== newProps.profileMode) {
      this.children.Buttons = ProfileActions.createButtons(newProps);
      return true;
    }
    return false;
  }

  render() {
    return '{{#each Buttons}}{{{this}}}{{/each}}';
  }
}

export default connect<ProfileActionsProps, ProfileActionsState>(mapStateToProps)(ProfileActions);
