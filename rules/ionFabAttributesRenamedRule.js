"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributesRenamed_1 = require("./helpers/attributesRenamed");
exports.ruleName = 'ion-fab-attributes-renamed';
const replacementMap = new Map([
    ['center', 'horizontal="center"'],
    ['start', 'horizontal="start"'],
    ['end', 'horizontal="end"'],
    ['top', 'vertical="top"'],
    ['bottom', 'vertical="bottom"'],
    ['middle', 'vertical="center"']
]);
const IonFabAttributesRenamedTemplateVisitor = attributesRenamed_1.createAttributesRenamedTemplateVisitorClass(['ion-fab'], replacementMap);
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
    description: 'Attributes of ion-fab have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
