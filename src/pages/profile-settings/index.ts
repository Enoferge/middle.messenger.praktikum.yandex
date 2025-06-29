import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';

import type { ProfileMode, ProfilePageProps } from './types';
import { connect } from '@/core/hoc/connect-to-store';
import { Block } from '@/core/block/block';
import { Avatar, AvatarActions, Button, IconButton } from '@/components';
import { getUserInfo, signOut } from '@/services/auth';
import type Router from '@/navigation/router';
import { ROUTER } from '@/navigation/constants';
import isEqual from '@/utils/is-equal';

import template from './profile.hbs?raw';
import * as SectionConfigs from './section-configs';
import './styles.scss'
import { ProfileForm, type UserInfo } from './components/profile-form';

const DEFAULT_PROFILE_MODE: ProfileMode = 'READ'

class ProfileSettingsPageBase extends Block<ProfilePageProps> {
  private router!: Router;

  constructor(props?: ProfilePageProps) {
    const mode = props?.mode ?? DEFAULT_PROFILE_MODE;
    const user = props?.user || null;

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
          mode,
          onBackToProfile: () => props?.onModeChange?.(DEFAULT_PROFILE_MODE),
          onChangeAvatar: () => props?.onModeChange?.('CHANGE_AVATAR'),
          onChangePassword: () => props?.onModeChange?.('CHANGE_PASS'),
          onSignOut: () => this.handleSignOut(),
        }),
        ProfileForm: new ProfileForm({
          mode,
          user,
          onModeChange: props?.onModeChange || (() => { }),
        }),
        // ProfileFileUpload: new ProfileFileUpload({
        //   mode,
        // }),
        Footer: new Button(SectionConfigs.getButtonProps(mode, props?.onModeChange)),
        CloseButton: new IconButton({
          iconName: 'close',
          variant: 'plain',
          onClick: () => console.log('onClose'),
        }),
      },
    });
  }

  private async handleSignOut() {
    const success = await signOut();
    if (success) {
      this.router.go(ROUTER.signIn);
    }
  }

  componentDidMount(): void {
    if (!this.props.user) {
      getUserInfo();
    }
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    const hasModeChanged = oldProps.mode !== newProps.mode;
    const hasUserChanged = !isEqual(oldProps.user || {}, newProps.user || {});

    const newMode = newProps.mode || DEFAULT_PROFILE_MODE;
    const newUser = newProps.user || null;

    if (hasModeChanged) {
      if (this.children.AvatarActions) {
        (this.children.AvatarActions as AvatarActions).setProps({ mode: newMode });
      }
      if (this.children.Footer) {
        (this.children.Footer as Button).setProps(
          SectionConfigs.getButtonProps(newMode, this.props.onModeChange)
        );
      }
    }

    if (hasModeChanged || hasUserChanged) {
      if (this.children.ProfileForm) {
        (this.children.ProfileForm as ProfileForm).setProps({ mode: newMode, user: newUser });
      }
    }

    return false;
  }

  render() {
    return template;
  }
}

type ProfileSettingsState = {
  profileMode: ProfileMode | null,
  user: UserInfo | null
}

const mapStateToProps = (state: ProfileSettingsState) => ({
  mode: state.profileMode || undefined,
  user: state.user || undefined,
  onModeChange: (mode: ProfileMode) => {
    window.store.set({
      profileMode: mode,
    })
  }
});

const ProfileSettingsPageConnected = connect<ProfilePageProps, any>(mapStateToProps)(ProfileSettingsPageBase);

export class ProfileSettingsPage extends BasePageWithLayout {
  constructor() {
    super(ProfileSettingsPageConnected, {});
  }
}