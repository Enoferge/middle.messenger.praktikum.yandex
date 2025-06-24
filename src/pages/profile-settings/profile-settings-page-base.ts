import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { AvatarActions } from '@/components/avatar-actions';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import type { ButtonProps } from '@/components/button/types';
import { getUserInfo, signOut } from '@/services/auth';
import { ROUTER } from '@/navigation/constants';
import type Router from '@/navigation/router';
import { connect } from '@/core/hoc/connect-to-store';
import isEqual from '@/utils/is-equal';

import template from './profile.hbs?raw';
import './styles.scss';
import type { ProfileMode, ProfilePageProps, ProfileState } from './types';
import { profilePagePropsByMode } from './constants';
import { ProfileContentBlock } from './components/profile-content-block';

export class ProfileSettingsPageBase extends Block<ProfilePageProps> {
  protected router!: Router;

  static getDynamicProps(mode: ProfileMode): { button: ButtonProps } {
    const {
      submitButtonText,
      isButtonDisabled,
    } = profilePagePropsByMode[mode];

    return ({
      button: {
        formId: mode === 'READ' ? undefined : 'profile-form',
        type: mode === 'READ' ? 'button' : 'submit',
        disabled: isButtonDisabled,
        name: 'profile-main-button',
        text: submitButtonText,
        fullWidth: true,
        onClick: mode === 'READ' ? (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          ProfileSettingsPageBase.updateProfileMode('EDIT');
        } : undefined,
      },
    });
  }

  static updateProfileMode(mode: ProfileMode) {
    window.store.set({ profileMode: mode });
  }

  constructor(props?: ProfilePageProps) {
    const { mode = 'READ', user = {} } = props || {};

    console.log('user in constructor');
    console.log(props);
    console.log(user);

    super('section', {
      mode,
      user,
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
          onBackToProfile: () => ProfileSettingsPageBase.updateProfileMode('READ'),
          onChangeAvatar: () => ProfileSettingsPageBase.updateProfileMode('CHANGE_AVATAR'),
          onChangePassword: () => ProfileSettingsPageBase.updateProfileMode('CHANGE_PASS'),
          onSignOut: async () => {
            const success = await signOut();
            if (success) {
              this.router.go(ROUTER.signIn);
            }
          },
        }),
        Content: new ProfileContentBlock({ mode, user }),
        Footer: new Button(ProfileSettingsPageBase.getDynamicProps(mode).button),
        CloseButton: new IconButton({
          iconName: 'close',
          variant: 'plain',
          onClick: () => console.log('onClose'),
        }),
      },
    });
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    console.log('PROFILE SETTINGS UPDATE');
    console.log(newProps);
    if (!isEqual(oldProps, newProps)) {
      (this.children.AvatarActions as AvatarActions).setProps({ mode: newProps.mode });
      (this.children.Content as ProfileContentBlock).setProps({ mode: newProps.mode, user: newProps.user });
      (this.children.Footer as Button)
        .setProps(ProfileSettingsPageBase.getDynamicProps(newProps.mode).button);

      return false;
    }

    return true;
  }

  componentDidMount(): void {
    // not do in component
    window.store.set({
      profileMode: 'READ',
    });

    if (!window.store.state.user) {
      console.log('need to get user info');
      getUserInfo();
    }
  }

  render() {
    return template;
  }
}

const mapStateToStore = (state: ProfileState) => ({
  mode: state.profileMode,
  user: state.user,
  isUserInfoLoading: state.isUserInfoLoading,
});

export const ProfileSettingsPageConnected = connect<ProfilePageProps, ProfileState>(
  mapStateToStore,
)(ProfileSettingsPageBase);
