import type { Props } from '@/core/block/types';

export interface FieldProps extends Props {
  name?: string;
  placeholder?: string;
  value?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxlength?: number;
  minlength?: number;
  class?: string;
  error?: string;

  onChange?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface InputProps extends FieldProps {
  type?: string;
}

export interface TextareaProps extends FieldProps {
  rows?: number;
  cols?: number;
}

export interface TextareaFieldProps extends Exclude<TextareaProps, 'onBlur' | 'onChange'> {
  error?: string;
  onFieldChange?: ({ name, value }: { name: string; value: string }) => void;
  onFieldBlur?: ({ name, value }: { name: string; value: string }) => void;
}
