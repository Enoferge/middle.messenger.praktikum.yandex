import { Avatar } from '@/components';
import { getAvatarFullUrl } from '@/utils/avatar';
import type { AvatarProps } from '@/components/avatar/types';
import { connect } from '@/core/hoc/connect-to-store';

import type { MessengerPageState } from '../../types';

const mapStateToProps = (state: MessengerPageState) => ({
  src: getAvatarFullUrl(state.activeChat?.avatar),
});

class ActiveChatAvatar extends Avatar {
  constructor(props?: AvatarProps) {
    super({
      ...props,
      size: 60,
      alt: 'Active chat avatar',
    });
  }
}

export default connect<AvatarProps, MessengerPageState>(mapStateToProps)(ActiveChatAvatar);
