import type { IconName } from '@/components/icon/types';

export interface IconButtonProps {
  iconName: IconName;
  variant?: 'filled' | 'plain' | string;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  disabled?: boolean;

  onClick: (e: Event) => void;
}
