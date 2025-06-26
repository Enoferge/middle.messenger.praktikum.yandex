import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { AvatarActions } from '@/components/avatar-actions';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { getUserInfo, signOut } from '@/services/auth';
import { ROUTER } from '@/navigation/constants';
import type Router from '@/navigation/router';
import { connect } from '@/core/hoc/connect-to-store';
import isEqual from '@/utils/is-equal';
import type { ButtonProps } from '@/components/button/types';

import template from './profile.hbs?raw';
import './styles.scss';
import type { ProfileMode, ProfilePageProps, ProfileState } from './types';
import { PROFILE_MODE_UI } from './constants';
import { ProfileContentBlock } from './components/profile-content-block';

const defaultProfileMode: ProfileMode = 'READ';

function getDynamicButtonProps(mode: ProfileMode, onModeChange?: ProfilePageProps['onModeChange']): ButtonProps {
  const config = PROFILE_MODE_UI[mode];
  const buttonType: 'button' | 'submit' = mode === 'READ' ? 'button' : 'submit';

  return {
    formId: mode === 'READ' ? undefined : 'profile-form',
    type: buttonType,
    disabled: config.isButtonDisabled ?? false,
    name: 'profile-main-button',
    text: config.submitText,
    fullWidth: true,
    onClick: mode === 'READ' ? (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      onModeChange?.('EDIT');
    } : undefined,
  };
}

export class ProfileSettingsPageBase extends Block<ProfilePageProps> {
  protected router!: Router;

  constructor(props?: ProfilePageProps) {
    const safeProps = props || {};
    const { mode = defaultProfileMode, user } = safeProps;

    super('section', {
      ...safeProps,
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
          mode,
          onBackToProfile: () => props?.onModeChange?.(defaultProfileMode),
          onChangeAvatar: () => props?.onModeChange?.('CHANGE_AVATAR'),
          onChangePassword: () => props?.onModeChange?.('CHANGE_PASS'),
          onSignOut: async () => {
            const success = await signOut();
            if (success) {
              this.router.go(ROUTER.signIn);
            }
          },
        }),
        Content: new ProfileContentBlock({ mode, user }),
        Footer: new Button(getDynamicButtonProps(mode, props?.onModeChange)),
        CloseButton: new IconButton({
          iconName: 'close',
          variant: 'plain',
          onClick: () => console.log('onClose'),
        }),
      },
    });
  }

  componentDidMount(): void {
    if (!this.props.user) {
      getUserInfo();
    }

    if (this.props.mode !== defaultProfileMode) {
      this.props.onModeChange?.(defaultProfileMode);
    }
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      (this.children.AvatarActions as AvatarActions).setProps({ mode: newProps.mode });
      (this.children.Content as ProfileContentBlock).setProps({
        mode: newProps.mode,
        user: newProps.user,
      });
      (this.children.Footer as Button).setProps(
        getDynamicButtonProps(newProps.mode ?? defaultProfileMode, newProps.onModeChange),
      );

      return false;
    }

    return true;
  }

  render() {
    return template;
  }
}

const mapStateToStore = (state: ProfileState) => ({
  mode: state.profileMode,
  user: state.user,
  isUserInfoLoading: state.isUserInfoLoading,
  onModeChange: (mode: ProfileMode) => window.store.set({ profileMode: mode })
});

export const ProfileSettingsPageConnected = connect<ProfilePageProps, ProfileState>(
  mapStateToStore,
)(ProfileSettingsPageBase);
