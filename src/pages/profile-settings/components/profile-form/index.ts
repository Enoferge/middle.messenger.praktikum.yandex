import { Block } from '@/core/block/block';
import { Form } from '@/components';
import type { Props } from '@/core/block/types';
import { connect } from '@/core/hoc/connect-to-store';
import type { ProfileMode, ProfileSettingsState } from '@/types/profile';

import { FORM_CONFIGS, FORM_PASSWORD_INITIAL_STATE, FORM_USER_INITIAL_STATE, PROFILE_FORM_ID } from './constants';
import { mapFormToApiFields } from './helpers';

interface ProfileFormProps extends Props {
  onSubmit: (form: Record<string, string>) => Promise<void>;
  onSuccess?: () => void;
}

type ProfileFormState = Pick<ProfileSettingsState, 'profileMode' | 'user'>
type ProfileFormStateProps = {
  profileMode: ProfileFormState['profileMode']
  user: Omit<ProfileFormState['user'], 'id'>
}

type ProfileStateUnitedProps = ProfileFormProps & ProfileFormStateProps

const mapStateToProps = (state: ProfileFormState): ProfileFormStateProps => {
  const { id: _id, ...userInfo } = state.user || {};

  return {
    profileMode: state.profileMode,
    user: userInfo,
  };
};

function isFormReadonly(mode: ProfileMode): boolean {
  return mode === 'READ';
}

class ProfileForm extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    const { profileMode, user, ...rest } = props as ProfileStateUnitedProps;

    const formSource = profileMode === 'CHANGE_PASS' ? 'password' : 'info';
    const formState = (profileMode === 'CHANGE_PASS' ? FORM_PASSWORD_INITIAL_STATE : user || FORM_USER_INITIAL_STATE);
    const formFields = FORM_CONFIGS[formSource].fields;

    super('div', {
      ...rest,
      class: 'profile-form',
      children: {
        Form: new Form({
          formId: PROFILE_FORM_ID,
          formFields,
          formState,
          onSubmit: async (form: Record<string, string>) => {
            await props.onSubmit(mapFormToApiFields(form));
          },
          onSuccess: props.onSuccess,
          isFormReadonly: isFormReadonly(profileMode),
        }),
      },
    });
  }

  componentDidUpdate(oldProps: ProfileStateUnitedProps, newProps: ProfileStateUnitedProps): boolean {
    if (oldProps.user !== newProps.user || oldProps.profileMode !== newProps.profileMode) {
      const formSource = newProps.profileMode === 'CHANGE_PASS' ? 'password' : 'info';
      const formState = (newProps.profileMode === 'CHANGE_PASS' ? FORM_PASSWORD_INITIAL_STATE : newProps.user || FORM_USER_INITIAL_STATE);

      if (this.children.Form) {
        (this.children.Form as Block).setProps({
          formFields: FORM_CONFIGS[formSource].fields,
          formState,
          isFormReadonly: isFormReadonly(newProps.profileMode),
        });
      }
    }
    return false;
  }

  render() {
    return '{{{Form}}}';
  }
}

export default connect<ProfileFormProps, ProfileFormState>(mapStateToProps)(ProfileForm);
