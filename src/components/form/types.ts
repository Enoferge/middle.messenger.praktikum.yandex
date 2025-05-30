import type { Block } from '@/core/block/block';
import type { Children } from '@/core/block/types';

interface Props {
  formId: string;
  autocomplete?: boolean;
  class?: string;
}

export interface FormSlots {
  FormFields: Block[];
}

export type FormProps = Props | FormSlots | Children;
