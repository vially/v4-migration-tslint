"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const parametersRenamed_1 = require("./helpers/parametersRenamed");
exports.ruleName = 'ion-loading-method-create-parameters-renamed';
const parameterMap = new Map([['content', 'message']]);
const Walker = parametersRenamed_1.createParametersRenamedClass('create', 'LoadingController', parameterMap);
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'LoadingController now takes in different parameters to its create method.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
};
exports.Rule = Rule;
