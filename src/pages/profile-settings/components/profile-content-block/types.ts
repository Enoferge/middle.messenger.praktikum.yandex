import type { Props } from '@/core/block/types';
import type { UserDTO } from '@/api/types';

import type { ProfileMode } from '../../types';

export interface ProfileContentProps extends Props {
  mode: ProfileMode
  user?: UserDTO
}
