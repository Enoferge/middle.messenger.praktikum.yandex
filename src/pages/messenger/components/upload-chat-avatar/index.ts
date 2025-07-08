import { FileUpload } from '@/components/file-upload';

import { UserCard } from '../user-card';

export interface UploadChatAvatarCardProps {
  chatId: number;
  selectedFile?: File
  onSuccess?: () => void;
  onFileUpload?: (file: File) => Promise<void>;
}

export class UploadChatAvatarCard extends UserCard {
  private selectedFile: File | null = null;

  constructor(props: UploadChatAvatarCardProps) {
    super({
      ...props,
      title: 'Change chat avatar',
      submitButtonText: 'Upload avatar',
      formId: 'change-chat-avatar-form',
      useFileUpload: true,
      customContent: new FileUpload({
        name: 'chat-avatar',
        onFileChange: (file: File) => {
          this.updateCustomContent({ fileName: file.name });
          this.selectedFile = file;
        },
      }),
      onSubmit: async () => {
        if (this.selectedFile && props.onFileUpload) {
          await props.onFileUpload(this.selectedFile);
        }
      },
    });
  }
}
