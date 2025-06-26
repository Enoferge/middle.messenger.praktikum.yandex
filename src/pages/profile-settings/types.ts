import type { FormProps } from '@/components/form/types';
import type { InputFieldProps } from '@/components/input-field/types';
import type { Props } from '@/core/block/types';
import type { ProfileContentProps } from './components/profile-content-block/types';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR' | 'CHANGE_AVATAR_ERROR' | 'CHANGE_AVATAR_UPLOADED';

export interface ProfileData extends ProfileContentProps {
  isUserInfoLoading: boolean;
}

export interface ProfileState extends Exclude<ProfileData, 'mode'> {
  profileMode?: ProfileData['mode']
}

export interface ProfilePageProps extends Partial<ProfileData>, Props {
  onModeChange?: (mode: ProfileMode) => void;
}

export type PropsByMode = {
  submitButtonText: string;
  formFields?: Array<InputFieldProps>;
  formState?: FormProps['formState'];
  isFormReadonly?: boolean;
  isFileError?: boolean
  isButtonDisabled?: boolean
  filename?: string
}
