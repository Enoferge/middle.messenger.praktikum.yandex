import type { RawPropsWithChildren } from '@/core/block/types';
import type { InputFieldProps } from '@/components/input-field/types';

export interface FormProps extends RawPropsWithChildren {
  formId: string;
  formFields?: InputFieldProps[];
  formState: Record<string, string | undefined>;
  formErrors?: Record<string, string | undefined>;
  errors?: Record<string, string>;
  onSubmit?: (e: Event) => void;
}
