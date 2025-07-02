import { BasePageWithLayout } from '@/core/base-page-with-layout/base-page-with-layout';
import { connect } from '@/core/hoc/connect-to-store';
import { Block } from '@/core/block/block';
import { Avatar, AvatarActions, Button, FileUpload, IconButton } from '@/components';
import { getUserInfo, signOut } from '@/services/auth';
import type Router from '@/navigation/router';
import { ROUTER } from '@/navigation/constants';
import isEqual from '@/utils/is-equal';
import { changeUserAvatar } from '@/services/user';

import type { ProfileMode, ProfilePageProps } from './types';
import template from './profile.hbs?raw';
import { getConfig, DEFAULT_PROFILE_MODE, BUTTON_UI_CONFIGS } from './section-configs';
import './styles.scss';
import { ProfileForm, type UserInfo } from './components/profile-form';

function getAvatarFullUrl(url?: string | null) {
  return url ? `https://ya-praktikum.tech/api/v2/resources/${url}` : '/assets/images/user1.png';
}

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
          src: getAvatarFullUrl(props?.avatarUrl),
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
        ProfileFileUpload: new FileUpload({
          name: 'user-avatar',
          onFileChange: (file: File) => {
            window.store.set({ avatarToUpload: file });
          },
        }),
        Footer: new Button({
          ...BUTTON_UI_CONFIGS[mode],
          fullWidth: true,
        }),
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

  private isButtonDisabled(mode: ProfileMode) {
    return mode === 'CHANGE_AVATAR' && this.props.avatarToUpload === null;
  }

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

    if (this.children.Footer) {
      (this.children.Footer as Button).setProps({
        onClick: this.getButtonClickHandler(mode),
        disabled: this.isButtonDisabled(mode),
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
      if (this.children.AvatarActions) {
        (this.children.AvatarActions as AvatarActions).setProps({ mode: newMode });
      }

      if (this.children.Footer) {
        (this.children.Footer as Button).setProps({
          ...BUTTON_UI_CONFIGS[newMode],
          onClick: this.getButtonClickHandler(newMode),
          disabled: this.isButtonDisabled(newMode),
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

      if (this.children.Footer) {
        (this.children.Footer as Button).setProps({
          disabled: this.isButtonDisabled(newMode),
        });
      }
    }

    if (oldProps.avatarUrl !== newProps.avatarUrl) {
      (this.children.Avatar as Block).setProps({ src: getAvatarFullUrl(newProps.avatarUrl) });
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
  avatarUrl?: string | null,
}

const mapStateToProps = (state: ProfileSettingsState) => ({
  mode: state.profileMode || undefined,
  user: state.user || undefined,
  avatarToUpload: state.avatarToUpload || null,
  avatarUrl: state.avatarUrl || null,
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
