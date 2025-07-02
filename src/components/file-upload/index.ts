import { Block } from '@/core/block/block';
import { Button } from '@/components/button';
import { connect } from '@/core/hoc/connect-to-store';

import type { FileUploadProps } from './types';
import template from './file-upload.hbs?raw';
import './styles.scss';

export interface FileUploadWithStoreProps extends FileUploadProps {
  fileToUpload?: File | null,
  fileUploadError?: string | null,
  onFileChange?: (file: File) => void,
}

const mapStateToProps = (state: Pick<FileUploadWithStoreProps, 'fileToUpload' | 'onFileChange' | 'fileUploadError'>) => ({
  fileToUpload: state.fileToUpload,
  error: state.fileUploadError,
});

export class FileUpload extends Block<FileUploadWithStoreProps> {
  constructor(props?: FileUploadWithStoreProps) {
    const classes = ['file-upload', props?.error ? 'file-upload_error' : '', props?.class || '']
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
      this.setProps({ filename: file.name });
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

export const ConnectedFileUpload = connect<FileUploadWithStoreProps, any>(mapStateToProps)(FileUpload);
