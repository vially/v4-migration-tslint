"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributesRenamed_1 = require("./helpers/attributesRenamed");
exports.ruleName = 'ion-label-attributes-renamed';
const replacementMap = new Map([['fixed', 'position="fixed"'], ['floating', 'position="floating"'], ['stacked', 'position="stacked"']]);
const IonButtonAttributesAreRenamedTemplateVisitor = attributesRenamed_1.createAttributesRenamedTemplateVisitorClass(['ion-label'], replacementMap);
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: IonButtonAttributesAreRenamedTemplateVisitor
        }));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'Attributes of ion-label have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
