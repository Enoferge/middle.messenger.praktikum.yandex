import type { UserInfo } from '@/api/types';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR';

export type ModeConfig = {
  showForm?: boolean;
  showFileUpload?: boolean;
};

export interface ProfileSettingsState {
  profileMode: ProfileMode;
  user?: UserInfo | null;
  userAvatarUrl?: string;
  avatarToUpload?: File | null;
  avatarUploadError?: string | null;
}
