import { createElementRenameRuleClass } from './helpers/elementRename';

export const ruleName = 'ion-option-is-now-ion-select-option';

export const Rule = createElementRenameRuleClass(ruleName, 'ion-option', 'ion-select-option');
