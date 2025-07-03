import { Block } from '@/core/block/block';
import { Form } from '@/components';
import type { UserDTO } from '@/api/types';
import type { Props } from '@/core/block/types';

import { FORM_CONFIGS, FORM_PASSWORD_INITIAL_STATE, FORM_USER_INITIAL_STATE, PROFILE_FORM_ID } from './constants';
import type { ProfileMode } from '../../types';
import { mapFormToApiFields } from './helpers';

export type UserInfo = Omit<UserDTO, 'id' | 'avatar'>;

interface ProfileFormProps extends Props {
  mode: ProfileMode;
  user: UserInfo | null;
  onSubmit: (form: Record<string, string>) => Promise<void>;
  onSuccess?: () => void;
}

function isFormReadonly(mode: ProfileMode): boolean {
  return mode === 'READ'
}

export class ProfileForm extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    const formSource = props.mode === 'CHANGE_PASS' ? 'password' : 'info';
    const formState = (props.mode === 'CHANGE_PASS' ? FORM_PASSWORD_INITIAL_STATE : props.user || FORM_USER_INITIAL_STATE);
    const formFields = FORM_CONFIGS[formSource].fields;

    super('div', {
      ...props,
      class: 'profile-form',
      children: {
        Form: new Form({
          formId: PROFILE_FORM_ID,
          formFields,
          formState,
          onSubmit: async (form: Record<string, string>) => {
            await props.onSubmit(mapFormToApiFields(form))
          },
          onSuccess: props.onSuccess,
          isFormReadonly: isFormReadonly(props.mode),
        }),
      },
    });
  }

  componentDidUpdate(oldProps: ProfileFormProps, newProps: ProfileFormProps): boolean {
    if (oldProps.user !== newProps.user || oldProps.mode !== newProps.mode) {
      const formSource = newProps.mode === 'CHANGE_PASS' ? 'password' : 'info';
      const formState = (newProps.mode === 'CHANGE_PASS' ? FORM_PASSWORD_INITIAL_STATE : newProps.user || FORM_USER_INITIAL_STATE);

      if (this.children.Form) {
        (this.children.Form as Block).setProps({
          formFields: FORM_CONFIGS[formSource].fields,
          formState,
          isFormReadonly: isFormReadonly(newProps.mode),
        });
      }
    }
    return false;
  }

  render() {
    return '{{{Form}}}';
  }
}
