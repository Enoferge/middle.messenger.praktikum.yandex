import type { Block } from '@/core/block/block';

type ButtonVariant = 'default' | 'plain';

export interface BlockSlots {
  Icon?: Block;
}

export interface ButtonProps extends BlockSlots {
  name: string;
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
}
