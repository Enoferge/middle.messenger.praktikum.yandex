import type { UserDTO } from '@/api/types';
import type { FormProps } from '@/components/form/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { Props } from '@/core/block/types';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR' | 'CHANGE_AVATAR_ERROR' | 'CHANGE_AVATAR_UPLOADED';

export interface ProfilePageProps extends Props {
  mode?: ProfileMode;
  user?: UserDTO
  isUserInfoLoading?: boolean
}

export type PropsByMode = {
  submitButtonText: string;
  formFields?: Array<InputFieldProps>;
  formState?: FormProps['formState'];
  isFormReadonly?: boolean;
  isFileError?: boolean
  isButtonDisabled?: boolean
  filename?: string
};

export type ProfileState = {
   profileMode: ProfileMode;
   user: UserDTO
   isUserInfoLoading: boolean
}
