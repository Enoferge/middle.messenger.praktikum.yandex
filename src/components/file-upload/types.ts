import type { Props } from '@/core/block/types';

export interface FileUploadProps extends Props {
  fileName?: string | null;
  fileUploadError?: string | null,
  onFileChange?: (file: File) => void,
}
