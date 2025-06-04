import type { TextareaProps } from '@/components/textarea/types';
import type { BaseFieldProps } from '@/types/base-field-props';

export interface TextareaFieldProps extends Exclude<TextareaProps, 'onChange' | 'onBlur' | 'onFocus'>, BaseFieldProps {}
