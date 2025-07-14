import { Block } from '@/core/block/block';
import { Button } from '@/components/button';

import template from './file-upload.hbs?raw';
import './styles.scss';
import type { FileUploadProps } from './types';

export class FileUpload extends Block<FileUploadProps> {
  constructor(props?: FileUploadProps) {
    const classes = ['file-upload', props?.fileUploadError ? 'file-upload_error' : '', props?.class || '']
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

  private handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.props.onFileChange?.(file);
    }
  };

  computeEvents() {
    return {
      change: (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (
          target && target.type === 'file' && target.classList.contains('file-upload__input')
        ) {
          this.handleFileChange(event);
        }
      },
    };
  }

  render() {
    return template;
  }
}
