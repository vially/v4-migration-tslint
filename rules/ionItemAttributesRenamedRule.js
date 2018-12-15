"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributesRenamed_1 = require("./helpers/attributesRenamed");
exports.ruleName = 'ion-item-attributes-renamed';
const replacementMap = new Map([
    ['item-start', 'slot="start"'],
    ['item-left', 'slot="start"'],
    ['item-end', 'slot="end"'],
    ['item-right', 'slot="end"']
]);
const IonItemAttributesRenamedTemplateVisitor = attributesRenamed_1.createAttributesRenamedTemplateVisitorClass(['ion-item'], replacementMap);
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: IonItemAttributesRenamedTemplateVisitor
        }));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'Attributes of ion-item have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
