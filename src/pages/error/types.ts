import type { BaseContext } from '../../navigation/types';

export interface ErrorContext extends BaseContext {
  code: number;
  message: string;
}
