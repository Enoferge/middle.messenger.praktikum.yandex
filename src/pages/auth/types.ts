import type { FormFooterProps } from '@/components/form-footer/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { Props } from '@/core/block/types';

export interface AuthPageProps extends Props {
  title: string;
  formId: string;
  formProps: {
    formFields: Array<InputFieldProps>;
    formState: Record<string, string>;
    // formErrors?: Record<string, string>; TODO: remove
  };
  footerProps: FormFooterProps;
}
