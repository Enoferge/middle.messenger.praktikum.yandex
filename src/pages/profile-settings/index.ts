import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import { connect } from '@/core/hoc/connect-to-store';
import { Block } from '@/core/block/block';
import { FileUpload, IconButton } from '@/components';
import { getUserInfo, signOut } from '@/services/auth';
import type Router from '@/navigation/router';
import { ROUTER } from '@/navigation/constants';
import isEqual from '@/utils/is-equal';
import { changeUserAvatar } from '@/services/user';

import type { ProfileMode, ProfilePageProps } from './types';
import template from './profile.hbs?raw';
import { getConfig, DEFAULT_PROFILE_MODE } from './section-configs';
import './styles.scss';
import { ProfileForm, type UserInfo } from './components/profile-form';
import ProfileAvatar from './components/profile-avatar';
import ProfileActions from './components/profile-actions';
import ProfileFooter from './components/profile-footer';

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
        Avatar: new ProfileAvatar({
          size: 160,
        }),
        ProfileActions: new ProfileActions({
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
        ProfileFileUpload: new FileUpload({
          name: 'user-avatar',
          onFileChange: (file: File) => {
            window.store.set({ avatarToUpload: file });
          },
        }),
        ProfileFooter: new ProfileFooter(),
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

  private handleEditClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onModeChange?.('EDIT');
  };

  private handleAvatarUploadClick = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const file = this.props.avatarToUpload;
      if (file) {
        const formData = new FormData();
        formData.append('avatar', file);

        await changeUserAvatar(formData);

        window.store.set({
          profileMode: 'READ',
          avatarToUpload: null,
        });

        // TODO: refac
        (this.children.ProfileFileUpload as Block).setProps({
          filename: null,
        });

        getUserInfo();
      }
    } catch (e) {
      window.store.set({
        fileUploadError: e || 'fileUpload error',
      });
    }
  };

  private getButtonClickHandler(mode: ProfileMode) {
    switch (mode) {
      case 'CHANGE_AVATAR':
        return this.handleAvatarUploadClick;
      case 'READ':
        return this.handleEditClick;
      default:
        return undefined;
    }
  }

  private toggleFormVisibility(mode?: ProfileMode) {
    const uiConfig = getConfig(mode);

    if (uiConfig.showFileUpload) {
      (this.children.ProfileForm as Block)?.hide();
      (this.children.ProfileFileUpload as Block)?.show();
    } else {
      (this.children.ProfileFileUpload as Block)?.hide();
      (this.children.ProfileForm as Block)?.show();
    }
  }

  componentDidMount(): void {
    const mode = this.props.mode || DEFAULT_PROFILE_MODE;

    if (this.children.ProfileFooter) {
      (this.children.ProfileFooter as Block).setProps({
        onClick: this.getButtonClickHandler(mode),
      });
    }

    this.toggleFormVisibility(mode);

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
      if (this.children.ProfileFooter) {
        (this.children.ProfileFooter as Block).setProps({
          onClick: this.getButtonClickHandler(newMode),
        });
      }

      this.toggleFormVisibility(newProps.mode);
    }

    if (hasModeChanged || hasUserChanged) {
      if (this.children.ProfileForm) {
        (this.children.ProfileForm as ProfileForm).setProps({ mode: newMode, user: newUser });
      }
    }

    if (oldProps.avatarToUpload !== newProps.avatarToUpload) {
      if (this.children.ProfileFileUpload) {
        (this.children.ProfileFileUpload as Block).setProps({ fileToUpload: newProps.avatarToUpload });
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
  avatarToUpload?: File | null,
}

const mapStateToProps = (state: ProfileSettingsState) => ({
  mode: state.profileMode || undefined,
  user: state.user || undefined,
  avatarToUpload: state.avatarToUpload || null,
});

const ProfileSettingsPageConnected = connect<ProfilePageProps, any>(mapStateToProps)(ProfileSettingsPageBase);

export class ProfileSettingsPage extends BasePageWithLayout {
  constructor() {
    super(ProfileSettingsPageConnected, {
      onModeChange: (mode: ProfileMode) => {
        window.store.set({
          profileMode: mode,
        });
      },
    });
  }
}
