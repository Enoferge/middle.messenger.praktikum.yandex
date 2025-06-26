import { Block } from '@/core/block/block';
import { Form, FileUpload } from '@/components';
import { changeUserInfo } from '@/services/user';
import type { ChangeUserInfoRequestData } from '@/api/user';
import type { UserDTO } from '@/api/types';

import { PROFILE_FORMS, PROFILE_MODE_UI } from '../../constants';
import type { ProfileMode } from '../../types';
import type { ProfileContentProps } from './types';

function userToFormState(user: UserDTO | undefined): Record<string, string> {
  if (!user) {
    return {};
  }

  const { id, avatar, ...rest } = user;
  return { ...rest };
}

function buildContent(mode: ProfileMode, user?: UserDTO) {
  const config = PROFILE_MODE_UI[mode];

  if (config.showFileUpload) {
    return new FileUpload({
      name: 'profile-avatar',
      error: config.fileError ? 'Error while uploading, please try again' : '',
      filename: config.filename,
    });
  }

  const formSource = mode === 'CHANGE_PASS' ? PROFILE_FORMS.password : PROFILE_FORMS.info;
  const userFormData = userToFormState(user);
  const isReadonly = !!config.isReadonly;

  return new Form({
    formId: 'profile-form',
    formFields: formSource.fields,
    formState: mode === 'CHANGE_PASS' ? formSource.initialState : userFormData,
    isFormReadonly: isReadonly,
    onSubmit: async (form: Record<string, string>) => {
      await changeUserInfo(form as ChangeUserInfoRequestData);
    },
  });
}

export class ProfileContentBlock extends Block<ProfileContentProps> {
  constructor(props: ProfileContentProps) {
    super('div', {
      ...props,
      children: {
        Content: buildContent(props.mode, props.user),
      },
    });
  }

  componentDidUpdate(_oldProps: ProfileContentProps, newProps: ProfileContentProps) {
    this.children.Content = buildContent(newProps.mode, newProps.user);
    return true;
  }

  render() {
    return '<div>{{{Content}}}</div>';
  }
}
