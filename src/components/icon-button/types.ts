import type { IconName } from '@/components/icon/types';
import type { Props } from '@/core/block/types';

export interface IconButtonProps extends Props{
  iconName: IconName;
  variant?: 'filled' | 'plain' | string;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  disabled?: boolean;

  onClick?: (e: Event) => void;
}
