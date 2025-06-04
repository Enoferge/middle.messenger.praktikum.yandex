import type { RawPropsWithChildren } from '@/core/block/types';
import type { IconName } from '../icon/types';

type ButtonVariant = 'default' | 'plain';

export interface ButtonProps extends RawPropsWithChildren {
  name?: string;
  type?: HTMLButtonElement['type'];
  tag?: keyof HTMLElementTagNameMap;
  text?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  isAccent?: boolean;
  formId?: string;
  iconName?: IconName

  onClick?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
}
