import type { InputProps } from '@/components/input/types';
import type { BaseFieldProps } from '@/types/base-field-props';

export interface InputFieldProps extends Exclude<InputProps, 'onChange' | 'onBlur' | 'onFocus'>, BaseFieldProps {}
