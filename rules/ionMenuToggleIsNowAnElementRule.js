"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directiveToElement_1 = require("./helpers/directiveToElement");
const directive = 'menuToggle';
exports.ruleName = 'ion-menu-toggle-is-now-an-element';
exports.Rule = directiveToElement_1.createDirectiveToElementRuleClass(exports.ruleName, directive, 'ion-menu-toggle', 'parent', 'menu');
