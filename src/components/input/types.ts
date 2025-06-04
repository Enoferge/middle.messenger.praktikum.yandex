import type { Props } from '@/core/block/types';
import type { BaseFieldAttrs } from '@/types/base-field-props';

export interface InputAttrs extends BaseFieldAttrs {
  type?: string;
}

export interface InputProps extends Props, InputAttrs {
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
}
