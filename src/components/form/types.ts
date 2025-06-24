import type { Props } from '@/core/block/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { Block } from '@/core/block/block';
import type { TextareaFieldProps } from '@/components/textarea-field/types';

export interface FormProps extends Props {
  formId: string;
  formFields?: Array<TextareaFieldProps | InputFieldProps>;
  formState?: Record<string, string>;
  formErrors?: Record<string, string>;
  isFormReadonly?: boolean;
  onSubmit?: (form: Record<string, string>) => Promise<void>
  onSuccess?: () => void

  children?: {
    FormFields?: Block[];
  };
}

export type FormState = {
  isFormLoading: boolean,
  formError: string | null,
}

export type ConnectedFormProps = FormProps & FormState
