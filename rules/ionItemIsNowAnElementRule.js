"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directiveToElement_1 = require("./helpers/directiveToElement");
const directive = 'ion-item';
exports.ruleName = 'ion-item-is-now-an-element';
exports.Rule = directiveToElement_1.createDirectiveToElementRuleClass(exports.ruleName, directive);
