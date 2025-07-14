import { Block } from '@/core/block/block';
import { Button } from '@/components/button';
import { connect } from '@/core/hoc/connect-to-store';
import type { Props } from '@/core/block/types';
import type { ProfileMode, ProfileSettingsState } from '@/types/profile';

import { BUTTON_UI_CONFIGS } from './constants';

export interface ProfileFooterProps extends Props {
  onClick?: (event: Event) => void;
}

type ProfileFooterState = Pick<ProfileSettingsState, 'profileMode' | 'avatarToUpload'>
type ProfileFooterStateProps = ProfileFooterState
type ProfileFooterUnitedProps = ProfileFooterProps & ProfileFooterStateProps

const mapStateToProps = (state: ProfileFooterState) => ({
  profileMode: state.profileMode,
  avatarToUpload: state.avatarToUpload,
});

function isButtonDisabled(mode: ProfileMode, avatarToUpload?: File | null) {
  return mode === 'CHANGE_AVATAR' && !avatarToUpload;
}

class ProfileFooter extends Block<ProfileFooterProps> {
  constructor(props: ProfileFooterProps) {
    const { profileMode, avatarToUpload, ...rest } = props as ProfileFooterUnitedProps;

    super('div', {
      ...rest,
      class: 'profile-card__form-footer',
      children: {
        Button: new Button({
          ...BUTTON_UI_CONFIGS[profileMode],
          fullWidth: true,
          disabled: isButtonDisabled(profileMode, avatarToUpload),
          onClick: props.onClick,
        }),
      },
    });
  }

  componentDidUpdate(oldProps: ProfileFooterUnitedProps, newProps: ProfileFooterUnitedProps): boolean {
    if (
      oldProps.profileMode !== newProps.profileMode
      || oldProps.avatarToUpload !== newProps.avatarToUpload
      || oldProps.onClick !== newProps.onClick
    ) {
      (this.children.Button as Button).setProps({
        ...BUTTON_UI_CONFIGS[newProps.profileMode],
        fullWidth: true,
        disabled: isButtonDisabled(newProps.profileMode, newProps.avatarToUpload),
        onClick: newProps.onClick,
      });
      return true;
    }
    return false;
  }

  render() {
    return '{{{Button}}}';
  }
}

export default connect<ProfileFooterProps, ProfileFooterState>(mapStateToProps)(ProfileFooter);
