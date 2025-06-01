import type { Block } from '@/core/block/block';
import type { RawPropsWithChildren } from '@/core/block/types';

export interface CardProps extends RawPropsWithChildren {
  title: string;
  children: {
    ContentBlock: Block;
    FooterBlock: Block;
  };
}
