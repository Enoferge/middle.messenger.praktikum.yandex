import type { Props } from '@/core/block/types';
import type { UserInfo } from '@/api/types';
import type { ProfileMode, ProfileSettingsState } from '@/types/profile';

export interface ProfileSettingsProps extends Props {
  onProfileModeChange?: (mode: ProfileMode) => void;
  onAvatarFileChange?: (file: File) => void;
  onAvatarUploadSuccess?: () => void;
  onAvatarUploadError?: (error?: string) => void;
  onUserInfoUpdate?: () => void;
  profileMode?: ProfileMode;
  user?: UserInfo | null;
  userAvatarUrl?: string;
  avatarToUpload?: File | null;
}

export type ProfileFileUploadState = Pick<ProfileSettingsState, 'avatarToUpload' | 'avatarUploadError'>
