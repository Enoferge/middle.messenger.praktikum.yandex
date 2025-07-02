import { PROFILE_FORM_ID } from './components/profile-form/configs';
import type { ProfileMode } from './types';

export type ModeConfig = {
  showForm?: boolean;
  showFileUpload?: boolean;
  isFormReadonly?: boolean;
};

export const MODE_UI_CONFIGS: Record<ProfileMode, ModeConfig> = {
  READ: { showForm: true, isFormReadonly: true },
  EDIT: { showForm: true },
  CHANGE_PASS: { showForm: true },
  CHANGE_AVATAR: { showFileUpload: true },
};

export type ButtonConfig = {
  type: 'button' | 'submit';
  text: string;
  formId?: string;
  fullWidth?: boolean,
};

export const BUTTON_UI_CONFIGS: Record<ProfileMode, ButtonConfig> = {
  READ: {
    fullWidth: true,
    text: 'Edit',
    type: 'button',
  },
  EDIT: {
    fullWidth: true,
    formId: PROFILE_FORM_ID,
    text: 'Save',
    type: 'submit',
  },
  CHANGE_PASS: {
    fullWidth: true,
    formId: PROFILE_FORM_ID,
    text: 'Save',
    type: 'submit',
  },
  CHANGE_AVATAR: {
    fullWidth: true,
    text: 'Upload avatar',
    type: 'button',
  },
};

export const DEFAULT_PROFILE_MODE: ProfileMode = 'READ';

export const getConfig = (mode?: ProfileMode): ModeConfig => MODE_UI_CONFIGS[mode || DEFAULT_PROFILE_MODE];

// TODO: not use it, pass isFormReadonly to ProfileForm
export const isFormReadonly = (mode: ProfileMode): boolean => !!getConfig(mode).isFormReadonly;
