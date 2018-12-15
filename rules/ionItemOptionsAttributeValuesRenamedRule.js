"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributeValuesRenamed_1 = require("./helpers/attributeValuesRenamed");
exports.ruleName = 'ion-item-options-attribute-values-renamed';
const replacementMap = new Map([['side', new Map([['left', 'start'], ['right', 'end']])]]);
const TemplateVisitor = attributeValuesRenamed_1.createAttributeValuesRenamedTemplateVisitorClass(['ion-item-options'], replacementMap);
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: TemplateVisitor
        }));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: `Attribute values of ion-item-options have been renamed.`,
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
