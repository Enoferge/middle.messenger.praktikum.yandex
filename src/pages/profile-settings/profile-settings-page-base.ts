import { Block } from '@/core/block/block';
import { Avatar } from '@/components/avatar';
import { AvatarActions } from '@/components/avatar-actions';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';

import { updateHashQuery } from '@/utils/update-hash-query';
import type { ButtonProps } from '@/components/button/types';
import template from './profile.hbs?raw';
import './styles.scss';
import type { ProfileMode, ProfilePageProps } from './types';
import { profilePagePropsByMode } from './constants';
import { ProfileContentBlock } from './components/profile-content-block';

export class ProfileSettingsPageBase extends Block<ProfilePageProps> {
  static getModeFromUrl(): ProfileMode | null {
    const { hash } = window.location;
    const query = hash.split('?')[1];

    if (!query) {
      return null;
    }

    const mode = new URLSearchParams(query).get('mode');
    return mode?.toUpperCase() as ProfileMode | null;
  }

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
        onClick: mode === 'READ' ? () => updateHashQuery('mode', 'edit') : undefined,
      },
    });
  }

  constructor() {
    const mode: ProfileMode = ProfileSettingsPageBase.getModeFromUrl() ?? 'READ';

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
          onBackToProfile: () => updateHashQuery('mode', 'read'),
          onChangeAvatar: () => updateHashQuery('mode', 'change_avatar'),
          onChangePassword: () => updateHashQuery('mode', 'change_pass'),
          onSignOut: () => console.log('sign out'),
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

  componentDidMount() {
    const mode = ProfileSettingsPageBase.getModeFromUrl();

    if (!mode) {
      setTimeout(() => updateHashQuery('mode', 'read'), 0);
    }

    window.addEventListener('hashchange', this.updateMode);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.updateMode);
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    if (oldProps.mode !== newProps.mode) {
      (this.children.AvatarActions as AvatarActions).setProps({ mode: newProps.mode });
      (this.children.Content as ProfileContentBlock).setProps({ mode: newProps.mode });
      (this.children.Footer as Button)
        .setProps(ProfileSettingsPageBase.getDynamicProps(newProps.mode).button);

      return false;
    }

    return true;
  }

  updateMode = () => {
    const newMode = ProfileSettingsPageBase.getModeFromUrl();

    if (newMode && this.props.mode !== newMode) {
      this.setProps({ mode: newMode });
    }
  };

  render() {
    return template;
  }
}
