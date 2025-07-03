import { Block } from '@/core/block/block';
import { Button } from '@/components/button';
import type { Props } from '@/core/block/types';
import { connect } from '@/core/hoc/connect-to-store';

import type { ProfileMode, ProfileSettingsState } from '../../types';
import { BUTTON_UI_CONFIGS } from './constants';

export interface ProfileFooterProps extends Props {
  onClick?: (event: Event) => void;
}

type ProfileFooterState = Pick<ProfileSettingsState, 'profileMode' | 'avatarToUpload'>
type ProfileFooterContext = ProfileFooterProps & ProfileFooterState

const mapStateToProps = (state: ProfileFooterState) => ({
  profileMode: state.profileMode,
  avatarToUpload: state.avatarToUpload,
});

function isButtonDisabled(mode: ProfileMode, avatarToUpload?: File | null) {
  return mode === 'CHANGE_AVATAR' && !avatarToUpload;
}

class ProfileFooter extends Block<ProfileFooterProps> {
  constructor(props: ProfileFooterContext) {
    super('div', {
      ...props,
      class: 'profile-card__form-footer',
      children: {
        Button: new Button({
          ...BUTTON_UI_CONFIGS[props.profileMode],
          fullWidth: true,
          disabled: isButtonDisabled(props.profileMode, props.avatarToUpload),
          onClick: props.onClick,
        }),
      },
    });
  }

  componentDidUpdate(oldProps: ProfileFooterContext, newProps: ProfileFooterContext): boolean {
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
