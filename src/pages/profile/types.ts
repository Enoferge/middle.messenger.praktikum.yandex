import type { InputField } from '../../components/input/types';
import type { BaseContext } from '../../navigation/types';

export interface ProfileContext extends BaseContext {
  mode: 'READ' | 'EDIT' | 'CHANGE_PASS' | 'CHANGE_AVATAR';
  formFields?: Array<InputField>;
}
