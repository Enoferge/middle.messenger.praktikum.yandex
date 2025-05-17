import type { BaseContext } from '../../navigation/types';

export interface ProfileContext extends BaseContext {
  mode:
    | 'READ'
    | 'EDIT'
    | 'CHANGE_PASS'
    | 'CHANGE_AVATAR'
    | 'CHANGE_AVATAR_ERROR'
    | 'CHANGE_AVATAR_UPLOADED';
  isFormInvalid?: boolean;
  fileData: {
    name: string;
    error?: string;
    filename?: string;
  };
}
