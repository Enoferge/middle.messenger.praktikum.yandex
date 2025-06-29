import { Block } from '@/core/block/block';
import { Form } from '@/components';
import type { UserDTO } from '@/api/types';
import type { Props } from '@/core/block/types';
import type { ChangeUserInfoRequestData, ChangeUserPassRequestData } from '@/api/user';
import isEqual from '@/utils/is-equal';
import { getUserInfo } from '@/services/auth';
import { changeUserInfo, changeUserPass } from '@/services/user';
import type { FormWithStoreProps } from '@/components/form';
import { formController } from '@/services/form-controller';

import { FORM_CONFIGS, FORM_PASSWORD_INITIAL_STATE, FORM_USER_INITIAL_STATE } from './configs';
import type { ProfileMode } from '../../types';
import { isFormReadonly } from '../../section-configs';


interface ProfileFormProps extends Props {
  mode: ProfileMode;
  user: UserInfo | null;
  onModeChange: (mode: ProfileMode) => void;
}

export type UserInfo = Omit<UserDTO, 'id' | 'avatar'>

export class ProfileForm extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    const formSource = props.mode === 'CHANGE_PASS' ? 'password' : 'info';
    const formState = (props.mode === 'CHANGE_PASS' ? FORM_PASSWORD_INITIAL_STATE : props.user || FORM_USER_INITIAL_STATE)
    const formFields = FORM_CONFIGS[formSource].fields
    const isReadonly = isFormReadonly(props.mode);

    super('div', {
      ...props,
      class: 'profile-form',
      children: {
        Form: new Form({
          formId: 'profile-form',
          formFields,
          formState,
          onSubmit: async (form: Record<string, string>) => {
            if (this.props.mode === 'CHANGE_PASS') {
              await changeUserPass(form as ChangeUserPassRequestData)
            } else {
              await changeUserInfo(form as ChangeUserInfoRequestData);
            }
          },
          onSuccess: () => {
            props.onModeChange('READ');
            getUserInfo()
          },
          isFormReadonly: isReadonly,
        }),
      },
    });
  }

  componentDidUpdate(oldProps: ProfileFormProps, newProps: ProfileFormProps): boolean {
    if (!isEqual(oldProps.user || {}, newProps.user || {})
      || oldProps.mode !== newProps.mode) {

      if (oldProps.mode !== newProps.mode) {
        formController.clearError('profile-form');
      }

      const formSource = newProps.mode === 'CHANGE_PASS' ? 'password' : 'info';
      const formState = (newProps.mode === 'CHANGE_PASS' ? FORM_PASSWORD_INITIAL_STATE : newProps.user || FORM_USER_INITIAL_STATE);
      const isReadonly = isFormReadonly(newProps.mode);

      if (this.children.Form) {
        (this.children.Form as Block<FormWithStoreProps>).setProps({
          formFields: FORM_CONFIGS[formSource].fields,
          formState,
          isFormReadonly: isReadonly,
        });
      }

      return false;
    }
    return false
  }

  render() {
    return '{{{Form}}}';
  }
} 