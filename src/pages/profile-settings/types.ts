import type { Props } from '@/core/block/types';
import type { UserDTO } from '@/api/types';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR';

export type ModeConfig = {
  showForm?: boolean;
  showFileUpload?: boolean;
};

export type UserInfo = Omit<UserDTO, 'id' | 'avatar'>;

export interface ProfileSettingsProps extends Props {
  onProfileModeChange?: (mode: ProfileMode) => void;
  onAvatarFileChange?: (file: File) => void;
  onAvatarUploadSuccess?: () => void;
  onAvatarUploadError?: (error?: string) => void;
  onUserInfoUpdate?: () => void;
}

export interface ProfileSettingsState {
  profileMode: ProfileMode
  user?: UserInfo | null
  userAvatarUrl?: string
  avatarToUpload?: File | null
  avatarUploadError?: string | null
}

export type ProfileFileUploadState = Pick<ProfileSettingsState, 'avatarToUpload' | 'avatarUploadError'>
