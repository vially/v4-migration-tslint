"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directiveToElement_1 = require("./helpers/directiveToElement");
const directive = 'ion-fab';
const resultantElement = 'ion-fab-button';
exports.ruleName = 'ion-fab-button-is-now-an-element';
exports.Rule = directiveToElement_1.createDirectiveToElementRuleClass(exports.ruleName, directive, resultantElement);
