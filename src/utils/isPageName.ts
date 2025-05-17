import { PAGE_NAMES } from '../navigation/constants';
import type { PageName } from '../navigation/types';

export function isPageName(name: string): name is PageName {
  return Object.values(PAGE_NAMES).includes(name as PageName);
}
