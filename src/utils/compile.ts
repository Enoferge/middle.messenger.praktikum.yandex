import { compile as hbsCompile } from 'handlebars';

export function compile(template: string, context: Record<string, unknown>) {
  return hbsCompile(template)(context);
}
