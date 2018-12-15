"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const ionLabelRequired_1 = require("./helpers/ionLabelRequired");
exports.ruleName = 'ion-item-ion-label-required';
const TemplateVisitor = ionLabelRequired_1.createIonLabelRequiredTemplateVisitorClass('ion-item');
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
    description: 'The ion-item component requires an ion-label component. It is no longer automatically added.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
