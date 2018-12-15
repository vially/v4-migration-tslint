"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directiveToElement_1 = require("./helpers/directiveToElement");
const directive = 'ion-text';
exports.ruleName = 'ion-text-is-now-an-element';
exports.Rule = directiveToElement_1.createDirectiveToElementRuleClass(exports.ruleName, directive, undefined, 'parent');
