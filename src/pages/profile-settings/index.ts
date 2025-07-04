import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import { connect } from '@/core/hoc/connect-to-store';
import { Block } from '@/core/block/block';
import { getUserInfo, signOut } from '@/services/auth';
import type Router from '@/navigation/router';
import { ROUTER } from '@/navigation/constants';
import { changeUserAvatar, changeUserInfo, changeUserPass } from '@/services/user';
import type { ChangeUserInfoRequestData, ChangeUserPassRequestData } from '@/api/user';
import { FileUpload, IconButton } from '@/components';
import type { FileUploadProps } from '@/components/file-upload/types';

import type { ProfileMode, ProfileSettingsState, ProfileFileUploadState, ProfileSettingsProps } from './types';
import template from './profile.hbs?raw';
import { getConfig, DEFAULT_PROFILE_MODE } from './constants';
import './styles.scss';
import ProfileForm from './components/profile-form';
import ProfileAvatar from './components/profile-avatar';
import ProfileActions from './components/profile-actions';
import ProfileFooter from './components/profile-footer';

type ProfileSettingsContext = ProfileSettingsProps & ProfileSettingsState

const mapStateToPropsFileUpload = (state: ProfileFileUploadState) => ({
  fileName: state.avatarToUpload?.name || null,
  fileUploadError: state.avatarUploadError,
});

const ProfileFileUpload = connect<FileUploadProps, ProfileFileUploadState>(mapStateToPropsFileUpload)(FileUpload);

class ProfileSettingsPageBase extends Block<ProfileSettingsContext> {
  private router!: Router;

  constructor(props?: ProfileSettingsContext) {
    super('section', {
      ...props,
      profileMode: props?.profileMode || DEFAULT_PROFILE_MODE,
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
          onBackToProfile: () => props?.onProfileModeChange?.(DEFAULT_PROFILE_MODE),
          onChangeAvatar: () => props?.onProfileModeChange?.('CHANGE_AVATAR'),
          onChangePassword: () => props?.onProfileModeChange?.('CHANGE_PASS'),
          onSignOut: () => this.handleSignOut(),
        }),
        ProfileForm: new ProfileForm({
          onSubmit: async (form: Record<string, string>) => {
            if (this.props.profileMode === 'CHANGE_PASS') {
              await changeUserPass(form as ChangeUserPassRequestData);
            } else {
              await changeUserInfo(form as ChangeUserInfoRequestData);
            }
          },
          onSuccess: () => this.props.onUserInfoUpdate?.(),
        }),
        ProfileFileUpload: new ProfileFileUpload({
          name: 'user-avatar',
          onFileChange: (file: File) => {
            props?.onAvatarFileChange?.(file);
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
    this.props.onProfileModeChange?.('EDIT');
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
        this.props.onAvatarUploadSuccess?.();
      }
    } catch (e) {
      const error = e as Error;
      this.props.onAvatarUploadError?.(error?.message || 'fileUpload error');
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
    const mode = (this.props as ProfileSettingsContext).profileMode || DEFAULT_PROFILE_MODE;

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

  componentDidUpdate(oldProps: ProfileSettingsContext, newProps: ProfileSettingsContext): boolean {
    const hasModeChanged = oldProps.profileMode !== newProps.profileMode;
    const newMode = newProps.profileMode || DEFAULT_PROFILE_MODE;

    if (hasModeChanged) {
      if (this.children.ProfileFooter) {
        (this.children.ProfileFooter as Block).setProps({
          onClick: this.getButtonClickHandler(newMode),
        });
      }

      this.toggleFormVisibility(newProps.profileMode);
    }

    return false;
  }

  render() {
    return template;
  }
}

const mapStateToProps = (state: ProfileSettingsState) => ({
  profileMode: state.profileMode || undefined,
  user: state.user || undefined,
  avatarToUpload: state.avatarToUpload || null,
});

const ProfileSettingsPageConnected = connect<ProfileSettingsProps, ProfileSettingsState>(mapStateToProps)(ProfileSettingsPageBase);

export class ProfileSettingsPage extends BasePageWithLayout {
  constructor() {
    super(ProfileSettingsPageConnected, {
      onProfileModeChange: (mode: ProfileMode) => {
        window.store.set({
          profileMode: mode,
        });
      },
      onAvatarUploadSuccess: () => {
        window.store.set({
          profileMode: DEFAULT_PROFILE_MODE,
          avatarToUpload: null,
        });

        getUserInfo();
      },
      onAvatarUploadError: (error: string) => {
        window.store.set({
          fileUploadError: error || 'fileUpload error',
        });
      },
      onAvatarFileChange: (file: File) => {
        window.store.set({
          avatarToUpload: file,
        });
      },
      onUserInfoUpdate: () => {
        window.store.set({
          profileMode: DEFAULT_PROFILE_MODE,
        });

        getUserInfo();
      },
    });
  }
}
