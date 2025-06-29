import type { ButtonProps } from '@/components/button/types';
import type { ProfileMode } from './types';

export type ModeConfig = {
  submitText: string;
  showForm?: boolean;
  showFileUpload?: boolean;
  isFormReadonly?: boolean;
  isButtonDisabled?: boolean;
  fileError?: boolean;
  filename?: string;
  formId?: string;
  buttonType: 'button' | 'submit';
};

export const MODE_CONFIGS: Record<ProfileMode, ModeConfig> = {
  READ: {
    submitText: 'Edit',
    showForm: true,
    isFormReadonly: true,
    buttonType: 'button',
  },
  EDIT: {
    submitText: 'Save',
    showForm: true,
    buttonType: 'submit',
    formId: 'profile-form',
  },
  CHANGE_PASS: {
    submitText: 'Save',
    showForm: true,
    buttonType: 'submit',
    formId: 'profile-form',
  },
  CHANGE_AVATAR: {
    submitText: 'Upload avatar',
    showFileUpload: true,
    isButtonDisabled: true,
    buttonType: 'submit',
    formId: 'profile-form',
  },
};

export const getConfig = (mode: ProfileMode): ModeConfig => MODE_CONFIGS[mode];

export const getButtonProps = (
  mode: ProfileMode,
  onModeChange?: (newMode: ProfileMode) => void,
): ButtonProps => {
  const config = getConfig(mode);

  return {
    formId: config.formId,
    type: config.buttonType,
    disabled: config.isButtonDisabled ?? false,
    name: 'profile-main-button',
    text: config.submitText,
    fullWidth: true,
    onClick: mode === 'READ' ? (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      onModeChange?.('EDIT');
    } : undefined,
  };
};

export const shouldShowForm = (mode: ProfileMode): boolean => !!getConfig(mode).showForm;

export const shouldShowFileUpload = (mode: ProfileMode): boolean => !!getConfig(mode).showFileUpload;

export const isFormReadonly = (mode: ProfileMode): boolean => !!getConfig(mode).isFormReadonly;
