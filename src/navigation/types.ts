import type { CardContext } from '../components/card/types';
import type { ErrorContext } from '../pages/error/types';
import type { HomeContext } from '../pages/home/types';
import type { MessengerContext } from '../pages/messenger/types';
import type { ProfileContext } from '../pages/profile/types';
import { PAGE_NAMES } from './constants';

export interface BasePageData<C extends Record<string, any>> {
  template: string;
  context?: C;
  layoutContext?: {
    hideHomeButton?: boolean;
  };
  mountCb?: () => void;
}

export interface BaseContext {
  formId?: string;
}

export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];
export type PageData = BasePageData<
  CardContext | ErrorContext | HomeContext | ProfileContext | MessengerContext
>;
