import type { Block } from '@/core/block/block';
import type { RawPropsWithChildren } from '@/core/block/types';

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

  onClick?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;

  children?: {
    Icon?: Block;
  };
}
