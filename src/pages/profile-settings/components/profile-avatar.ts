import { Avatar } from '@/components';
import { getAvatarFullUrl } from '@/utils/avatar';
import type { AvatarProps } from '@/components/avatar/types';
import { connect } from '@/core/hoc/connect-to-store';

import type { ProfileSettingsState } from '../types';

type ProfileAvatarState = Pick<ProfileSettingsState, 'userAvatarUrl'>

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
