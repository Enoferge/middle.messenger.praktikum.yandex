import type { ProfileMode } from '../../types';
import { PROFILE_FORM_ID } from '../profile-form/configs';

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
