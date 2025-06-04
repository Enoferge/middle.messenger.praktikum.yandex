import type { RawProps } from '@/core/block/types';

export interface AvatarProps extends RawProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
}
