import { PAGE_NAMES } from '../navigation/constants';
import type { PageName } from '../navigation/types';
import { isPageName } from './isPageName';

export function getCurrentPageNameFromPath(): PageName {
  const path = window.location.pathname.slice(1);
  return isPageName(path) ? path : PAGE_NAMES.HOME;
}
