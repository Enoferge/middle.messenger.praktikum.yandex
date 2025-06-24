import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { AvatarActions } from '@/components/avatar-actions';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import type { ButtonProps } from '@/components/button/types';
import { signOut } from '@/services/auth';
import { ROUTER } from '@/navigation/constants';
import type Router from '@/navigation/router';
import { connect } from '@/core/hoc/connect-to-store';

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
        onClick: mode === 'READ' ? () => ProfileSettingsPageBase.updateProfileMode('EDIT') : undefined,
      },
    });
  }

  static updateProfileMode(mode: ProfileMode) {
    window.store.set({ profileMode: mode });
  }

  constructor(props?: ProfilePageProps) {
    const mode = props?.mode ?? 'READ';

    super('section', {
      mode,
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
        Content: new ProfileContentBlock({ mode }),
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
    if (newProps.mode && oldProps.mode !== newProps.mode) {
      (this.children.AvatarActions as AvatarActions).setProps({ mode: newProps.mode });
      (this.children.Content as ProfileContentBlock).setProps({ mode: newProps.mode });
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
  }

  render() {
    return template;
  }
}

const mapStateToStore = (state: ProfileState) => ({
  mode: state.profileMode,
});

export const ProfileSettingsPageStore = connect<ProfilePageProps, ProfileState>(
  mapStateToStore,
)(ProfileSettingsPageBase);
