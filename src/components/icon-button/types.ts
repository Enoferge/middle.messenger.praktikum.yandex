import type { IconName } from '@/components/icon/types';
import type { Props } from '@/core/block/types';

export interface IconButtonProps extends Props{
  variant?: 'filled' | 'plain' | string;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  disabled?: boolean;
  form?: string
  iconName: IconName;

  onClick?: (e: Event) => void;
}
