import type { Props } from '@/core/block/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { Block } from '@/core/block/block';

export interface FormProps extends Props {
  formId: string;
  formFields?: InputFieldProps[];
  formState?: Record<string, string>;
  formErrors?: Record<string, string>; // TODO: remove
  isFormReadonly?: boolean;
  onSubmit?: (e: Event) => void;

  children?: {
    FormFields?: Block[];
  };
}
