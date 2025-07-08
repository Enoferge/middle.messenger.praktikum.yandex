import { FORM_FIELD_TYPE } from '@/constants/formFields';

export type FormFieldType = typeof FORM_FIELD_TYPE[keyof typeof FORM_FIELD_TYPE];

export interface BaseFieldAttrs {
  name: string;
  value?: string;
  minlength?: number;
  readonly?: boolean;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  placeholder?: string;
  autocomplete?: boolean;
  class?: string;
}

export interface BaseFieldProps {
  fieldType: FormFieldType;
  error?: string;
  onFieldChange?: ({ name, value }: { name: string; value: string }) => void;
  onFieldBlur?: ({ name, value }: { name: string; value: string }) => void;
  onEnterPressed?: ({ name, value }: { name: string; value: string }) => Promise<void> | void
}

export interface FocusableField {
  focus(): void;
}
