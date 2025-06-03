import type { Props } from '@/core/block/types';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR' | 'CHANGE_AVATAR_ERROR' | 'CHANGE_AVATAR_UPLOADED';

export interface ProfilePageProps extends Props {
  mode: ProfileMode;
}
