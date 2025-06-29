import type { UserInfo } from "@/pages/profile-settings/components/profile-form";
import type { ProfileMode } from "@/pages/profile-settings/types";

export type State = Record<string, any>

export interface StoreState {
  user: UserInfo;
  profileMode: ProfileMode;
  formError: string | null;
  isFormLoading: boolean;
}
