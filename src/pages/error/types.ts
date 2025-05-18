import type { BaseContext } from '../../navigation/types';

export interface ErrorContext extends BaseContext {
  code: string;
  message: string;
}
