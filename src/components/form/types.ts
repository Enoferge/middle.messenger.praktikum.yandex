import type { Props } from '@/core/block/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { Block } from '@/core/block/block';
import type { TextareaFieldProps } from '@/components/textarea-field/types';

export interface FormProps extends Props {
  formId: string;
  formFields?: Array<TextareaFieldProps | InputFieldProps>;
  formState?: Record<string, string>;
  fieldsErrors?: Record<string, string>;
  isFormReadonly?: boolean;
  formError?: string | null;
  isFormLoading?: boolean;
  onSubmit?: (form: Record<string, string>) => Promise<void>
  onSuccess?: () => void

  children?: {
    FormFields?: Block[];
    FormError?: Block
    FormLoadingSpinner?: Block;
    CustomContent?: Block;
  };
}
