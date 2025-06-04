import { Block } from '@/core/block/block';
import { Button } from '@/components/button';

import type { FileUploadProps } from './types';
import template from './file-upload.hbs?raw';
import './styles.css';

export class FileUpload extends Block<FileUploadProps> {
  constructor(props: FileUploadProps) {
    const classes = ['file-upload', props.error ? 'file-upload_error' : '', props.class || '']
      .filter(Boolean)
      .join(' ');

    super('div', {
      ...props,
      class: classes,
      children: {
        ChooseFileButton: new Button({
          tag: 'div',
          type: 'button',
          text: 'Choose file',
          iconName: 'upload',
          variant: 'plain',
          class: 'file-upload__button',
        }),
      },
    });
  }

  render() {
    return template;
  }
}
