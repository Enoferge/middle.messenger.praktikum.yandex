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

export const DEFAULT_PROFILE_MODE: ProfileMode = 'READ';

export const getConfig = (mode?: ProfileMode): ModeConfig => MODE_UI_CONFIGS[mode || DEFAULT_PROFILE_MODE];

// TODO: not use it, pass isFormReadonly to ProfileForm
export const isFormReadonly = (mode: ProfileMode): boolean => !!getConfig(mode).isFormReadonly;
