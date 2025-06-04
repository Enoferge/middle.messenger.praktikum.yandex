import type { FormFooterProps } from '@/components/form-footer/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { TextareaFieldProps } from '@/components/textarea-field/types';
import type { Props } from '@/core/block/types';

export interface AuthPageProps extends Props {
  title: string;
  formId: string;
  formProps: {
    formFields: Array<InputFieldProps | TextareaFieldProps>;
    formState: Record<string, string>;
  };
  footerProps: FormFooterProps;
}
