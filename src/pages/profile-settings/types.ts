import type { Props } from '@/core/block/types';
import type { UserInfo } from './components/profile-form';

export type ProfileMode = 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR';

export type ModeConfig = {
  showForm?: boolean;
  showFileUpload?: boolean;
};

export interface ProfilePageProps extends Props {
  mode?: ProfileMode;
  user?: UserInfo;
  avatarToUpload?: File | null,
  onModeChange?: (mode: ProfileMode) => void;
  onAvatarFileChange?: (file: File) => void;
  onAvatarUploadSuccess?: () => void;
  onAvatarUploadError?: (error?: string) => void;
  onUserInfoUpdate?: () => void;
}

export interface ProfileSettingsState {
  profileMode: ProfileMode
  user?: UserInfo | null
  avatarToUpload?: File | null
  avatarUploadError?: string | null
}

export type ProfileFileUploadState = Pick<ProfileSettingsState, 'avatarToUpload' | 'avatarUploadError'>
