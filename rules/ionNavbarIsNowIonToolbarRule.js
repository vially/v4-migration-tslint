"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementRename_1 = require("./helpers/elementRename");
exports.ruleName = 'ion-navbar-is-now-ion-toolbar';
exports.Rule = elementRename_1.createElementRenameRuleClass(exports.ruleName, 'ion-navbar', 'ion-toolbar');
