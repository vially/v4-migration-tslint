"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementRename_1 = require("./helpers/elementRename");
exports.ruleName = 'ion-option-is-now-ion-select-option';
exports.Rule = elementRename_1.createElementRenameRuleClass(exports.ruleName, 'ion-option', 'ion-select-option');
