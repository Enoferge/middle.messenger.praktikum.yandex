import type { ModeConfig, ProfileMode } from './types';

export const MODE_UI_CONFIGS: Record<ProfileMode, ModeConfig> = {
  READ: { showForm: true },
  EDIT: { showForm: true },
  CHANGE_PASS: { showForm: true },
  CHANGE_AVATAR: { showFileUpload: true },
};

export const DEFAULT_PROFILE_MODE: ProfileMode = 'READ';

export const getConfig = (mode?: ProfileMode): ModeConfig => MODE_UI_CONFIGS[mode || DEFAULT_PROFILE_MODE];
