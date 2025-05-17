import type { CardContext } from '../components/card/types';
import { PAGE_NAMES } from './constants';

export type AuthPageData = {
  template: string;
  cardContext?: CardContext;
  mountCb?: () => void;
};

export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];
