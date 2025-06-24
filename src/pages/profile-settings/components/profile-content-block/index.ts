import { Block } from '@/core/block/block';
import { Form, FileUpload } from '@/components';

import { changeUserInfo } from '@/services/user';
import type { ChangeUserInfoRequestData } from '@/api/user';
import { FormFieldName } from '@/constants/formFields';
import type { UserDTO } from '@/api/types';
import { profilePagePropsByMode } from '../../constants';
import type { ProfileMode } from '../../types';
import type { ProfileContentProps } from './types';

const testFields = {
  [FormFieldName.FirstName]: 'TestFirst',
  [FormFieldName.SecondName]: 'TestSecond',
  [FormFieldName.Login]: 'TestLoginSvr1',
  [FormFieldName.DisplayName]: 'TestDisplaySvr1',
  [FormFieldName.Email]: 'test-email-svr1@yandex.ru',
  [FormFieldName.Phone]: '+79998887766',
};

export class ProfileContentBlock extends Block<ProfileContentProps> {
  static getContentChild(mode: ProfileMode, user?: UserDTO) {
    console.log('getContentChild');
    console.log(user);
    const data = profilePagePropsByMode[mode];

    const { id, avatar, ...userInfo } = user || {};

    return mode.startsWith('CHANGE_AVATAR')
      ? new FileUpload({
        name: 'profile-avatar',
        error: data.isFileError ? 'Error while uploading, please try again' : '',
        filename: data.filename,
      })
      : new Form({
        formId: 'profile-form',
        formFields: data.formFields,
        // formState: data.formState,
        formState: userInfo,
        isFormReadonly: data.isFormReadonly,
        onSubmit: async (form: Record<string, string>) => {
          console.log('SUMBIT PROFILE FORM');
          await changeUserInfo(form as ChangeUserInfoRequestData);
        },
      });
  }

  constructor(props: ProfileContentProps) {
    super('div', {
      ...props,
      children: { Content: ProfileContentBlock.getContentChild(props.mode, props.user) },
    });
  }

  componentDidUpdate(_oldProps: ProfileContentProps, newProps: ProfileContentProps) {
    this.children.Content = ProfileContentBlock.getContentChild(newProps.mode, newProps.user);
    return true;
  }

  render() {
    return '<div>{{{Content}}}</div>';
  }
}
