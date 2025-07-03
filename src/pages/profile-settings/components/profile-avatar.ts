import { Avatar } from '@/components';
import { getResourceLink } from '@/services/resources';
import type { AvatarProps } from '@/components/avatar/types';
import { connect } from '@/core/hoc/connect-to-store';

import type { ProfileSettingsState } from '../types';

type ProfileAvatarState = Pick<ProfileSettingsState, 'userAvatarUrl'>

function getAvatarFullUrl(url?: string | null) {
  return url ? getResourceLink(url) : '/assets/images/user1.png';
}

const mapStateToProps = (state: ProfileAvatarState) => ({
  src: getAvatarFullUrl(state.userAvatarUrl),
});

class ProfileAvatar extends Avatar {
  constructor(props?: AvatarProps) {
    super({
      ...props,
      size: 160,
      alt: 'User avatar',
    });
  }
}

export default connect<AvatarProps, ProfileAvatarState>(mapStateToProps)(ProfileAvatar);
