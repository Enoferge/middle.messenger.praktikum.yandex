import type { InputFieldProps } from '@/components/input-field/types';

export interface ProfilePageProps {
  mode: 'READ' | 'EDIT' | 'CHANGE_AVATAR' | 'CHANGE_AVATAR_ERROR' | 'CHANGE_AVATAR_UPLOADED';
  formId: string;
  formFields?: InputFieldProps[];
  formState?: Record<string, string>;
  formErrors?: Record<string, string>;
  fileData?: {
    name: string;
    filename?: string;
    // fileUrl?: string;
    error?: string;
  };
  submitButtonText?: string;
  isFormInvalid?: boolean;

  onSignOut?: () => void;
  onChangeAvatar?: () => void;
  onChangePassword?: () => void;
  onClose?: () => void;
}
