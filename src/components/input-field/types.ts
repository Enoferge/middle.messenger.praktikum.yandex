import type { InputProps } from '@/components/input/types';

export interface InputFieldProps extends Exclude<InputProps, 'onBlur' | 'onChange'> {
  label?: string;
  error?: string;
  onFieldChange?: ({ name, value }: { name: string; value: string }) => void;
  onFieldBlur?: ({ name, value }: { name: string; value: string }) => void;
}
