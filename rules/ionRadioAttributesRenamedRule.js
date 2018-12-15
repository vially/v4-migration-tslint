"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributesRenamed_1 = require("./helpers/attributesRenamed");
exports.ruleName = 'ion-radio-attributes-renamed';
const replacementMap = new Map([['item-left', 'slot="start"'], ['item-right', 'slot="end"']]);
const IonFabAttributesRenamedTemplateVisitor = attributesRenamed_1.createAttributesRenamedTemplateVisitorClass(['ion-radio'], replacementMap);
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: IonFabAttributesRenamedTemplateVisitor
        }));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'Attributes of ion-radio have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
