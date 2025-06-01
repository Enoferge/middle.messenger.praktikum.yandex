import type { RawPropsWithChildren } from '@/core/block/types';

export interface InputProps extends RawPropsWithChildren, InputAttrs {
  onChange?: (e: InputEvent) => void;
  onBlur?: (e: InputEvent) => void;
  onFocus?: (e: InputEvent) => void;
}

export interface InputAttrs {
  name: string;
  value?: string;
  type: string;
  minlength?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  autocomplete?: boolean;
}
