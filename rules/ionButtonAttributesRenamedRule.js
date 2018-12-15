"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributesRenamed_1 = require("./helpers/attributesRenamed");
exports.ruleName = 'ion-button-attributes-renamed';
const replacementMap = new Map([
    ['icon-left', 'slot="start"'],
    ['icon-start', 'slot="start"'],
    ['icon-right', 'slot="end"'],
    ['icon-end', 'slot="end"'],
    ['small', 'size="small"'],
    ['large', 'size="large"'],
    ['clear', 'fill="clear"'],
    ['outline', 'fill="outline"'],
    ['solid', 'fill="solid"'],
    ['full', 'expand="full"'],
    ['block', 'expand="block"']
]);
const IonButtonAttributesAreRenamedTemplateVisitor = attributesRenamed_1.createAttributesRenamedTemplateVisitorClass(['ion-button'], replacementMap);
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
    description: 'Attributes of ion-button have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
