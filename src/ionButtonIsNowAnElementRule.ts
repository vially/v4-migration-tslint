import { createDirectiveToElementRuleClass } from './helpers/directiveToElement';

const directive = 'ion-button';

export const ruleName = 'ion-button-is-now-an-element';
export const Rule = createDirectiveToElementRuleClass(ruleName, directive);
