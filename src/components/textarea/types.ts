import type { Props } from '@/core/block/types';
import type { BaseFieldAttrs } from '@/types/base-field-types';

export interface TextareaAttrs extends BaseFieldAttrs {
  maxlength?: number;
  rows?: number;
  cols?: number;
}

export interface TextareaProps extends Props, TextareaAttrs {
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onKeyDown?: (e: Event) => void;
}
