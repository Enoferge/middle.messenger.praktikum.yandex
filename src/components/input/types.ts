import type { Props } from '@/core/block/types';

export interface InputProps extends Props, InputAttrs {
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
  onFocus: (e: Event) => void;
}

export interface InputAttrs {
  name: string;
  value?: string;
  type?: string;
  minlength?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  autocomplete?: boolean;
}
