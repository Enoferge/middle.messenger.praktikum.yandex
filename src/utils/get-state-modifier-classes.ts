import type { InputFieldProps } from '@/components/input-field/types';

type StateProps = Pick<InputFieldProps, 'readonly' | 'error' | 'disabled'>

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
