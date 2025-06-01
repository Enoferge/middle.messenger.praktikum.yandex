import type { FormFooterProps } from '@/components/form-footer/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { RawPropsWithChildren } from '@/core/block/types';

// TODO: add generic
export interface AuthPageProps extends RawPropsWithChildren {
  title: string;
  formId: string;
  formProps: {
    formFields: Array<InputFieldProps>;
    formState: Record<string, string>;
    formErrors: Record<string, string>;
  };
  footerProps: FormFooterProps;
}
