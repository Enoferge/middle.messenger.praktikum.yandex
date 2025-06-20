import { Block } from '@/core/block/block';
import { Form, FileUpload } from '@/components';

import { profilePagePropsByMode } from '../../constants';
import type { ProfileMode } from '../../types';
import type { ProfileContentProps } from './types';

export class ProfileContentBlock extends Block<ProfileContentProps> {
  static getContentChild(mode: ProfileMode) {
    const data = profilePagePropsByMode[mode];

    return mode.startsWith('CHANGE_AVATAR')
      ? new FileUpload({
        name: 'profile-avatar',
        error: data.isFileError ? 'Error while uploading, please try again' : '',
        filename: data.filename,
      })
      : new Form({
        formId: 'profile-form',
        formFields: data.formFields,
        formState: data.formState,
        isFormReadonly: data.isFormReadonly,
      });
  }

  constructor(props: { mode: ProfileMode }) {
    super('div', {
      ...props,
      children: { Content: ProfileContentBlock.getContentChild(props.mode) },
    });
  }

  componentDidUpdate(_oldProps: ProfileContentProps, newProps: ProfileContentProps) {
    this.children.Content = ProfileContentBlock.getContentChild(newProps.mode);
    return true;
  }

  render() {
    return '<div>{{{Content}}}</div>';
  }
}
