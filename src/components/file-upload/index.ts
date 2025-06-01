import { Block } from '@/core/block/block';
import { Button } from '@/components/button';

import type { FileUploadProps } from './types';
import template from './file-upload.hbs?raw';
import './styles.css';

export class FileUpload extends Block {
  constructor(props: FileUploadProps) {
    super('div', {
      ...props,
      children: {
        ChooseFileButton: new Button({
          tag: 'div',
          text: 'Choose file',
          icon: 'upload',
          variant: 'plain',
          class: 'file-upload__button',
          type: 'button',
        }),
      },
    });
  }

  computeClass(): string {
    return ['file-upload', this.props.error ? 'file-upload_error' : '', this.props.class || '']
      .filter(Boolean)
      .join(' ');
  }

  render() {
    return template;
  }
}
