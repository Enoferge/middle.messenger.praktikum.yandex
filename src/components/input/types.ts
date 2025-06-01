import type { RawPropsWithChildren } from '@/core/block/types';

export interface InputProps extends RawPropsWithChildren, InputAttrs {
  onChange?: (e: Event) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
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
