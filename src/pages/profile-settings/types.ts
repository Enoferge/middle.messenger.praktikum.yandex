import type { Props } from '@/core/block/types';
import type { UserInfo } from './components/profile-form';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR';

export interface ProfilePageProps extends Props {
  mode?: ProfileMode;
  user?: UserInfo;
  onModeChange?: (mode: ProfileMode) => void;
}