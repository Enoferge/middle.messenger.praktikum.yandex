import type { RawProps } from '@/core/block/types';

export interface FileUploadProps extends RawProps {
  filename?: string;
  error?: string | null;
}
