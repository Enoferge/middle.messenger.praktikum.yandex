import type { ProfileSettingsState } from '@/pages/profile-settings/types';

export type State = Record<string, any>

export interface StoreState extends ProfileSettingsState {
  formError: string | null;
  isFormLoading: boolean;
}
