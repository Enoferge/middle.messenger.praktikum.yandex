import type { RawProps } from '@/core/block/types';

export interface FileUploadProps extends RawProps {
  name: string;
  filename?: string;
  error?: string;
}
