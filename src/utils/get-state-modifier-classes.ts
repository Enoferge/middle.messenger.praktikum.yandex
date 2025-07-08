import type { BaseFieldAttrs } from '@/types/base-field-types';

type StateProps = Pick<BaseFieldAttrs, 'error' | 'readonly' | 'disabled'>

export function getStateModifierClasses(
  baseClass: string,
  props: StateProps,
): string[] {
  const states: Array<keyof StateProps> = ['error', 'readonly', 'disabled'];

  const classes = states.reduce<string[]>(
    (acc, state) => {
      if (props[state]) {
        acc.push(`${baseClass}_${String(state)}`);
      }
      return acc;
    },
    [baseClass],
  );

  return classes;
}
