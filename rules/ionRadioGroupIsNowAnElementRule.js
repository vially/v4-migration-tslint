"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directiveToElement_1 = require("./helpers/directiveToElement");
const directive = 'radio-group';
exports.ruleName = 'ion-radio-group-is-now-an-element';
exports.Rule = directiveToElement_1.createDirectiveToElementRuleClass(exports.ruleName, directive, 'ion-radio-group', 'child');
