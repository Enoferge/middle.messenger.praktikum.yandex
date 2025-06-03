import type { Props } from '@/core/block/types';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR';

export interface ProfilePageProps extends Props {
  mode: ProfileMode;
  onClose: () => void;
}
