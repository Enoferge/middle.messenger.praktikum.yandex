import type { RawProps } from '@/core/block/types';

export interface AvatarActionsProps extends RawProps {
  mode: string;

  onBackToProfile: () => void;
  onSignOut: () => void;
  onChangeAvatar: () => void;
  onChangePassword: () => void;
}
