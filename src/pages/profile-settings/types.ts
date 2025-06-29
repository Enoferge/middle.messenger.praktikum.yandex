import type { UserDTO } from '@/api/types';
import type { Props } from '@/core/block/types';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR';

export interface ProfilePageProps extends Props {
  mode?: ProfileMode;
  user?: UserDTO;
  isUserInfoLoading?: boolean;
  formError?: string | null
  onModeChange?: (mode: ProfileMode) => void;
}