import type { Block } from '@/core/block/block';

import { PAGE_NAMES } from './constants';

export interface PageData {
  pageBlock: Block;
  layoutContext?: {
    hideHomeButton?: boolean;
  };
}

export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];
