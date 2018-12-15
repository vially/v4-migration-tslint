"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
const utils_1 = require("./helpers/utils");
exports.ruleName = 'ion-back-button-not-added-by-default';
class TemplateVisitor extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
    visitElement(element, context) {
        if (element.name && element.name === 'ion-toolbar') {
            let found = false;
            const ionButtonsElement = element.children.find((e) => utils_1.isElementAst(e) && e.name === 'ion-buttons');
            if (ionButtonsElement) {
                const ionBackButtonElement = ionButtonsElement.children.find(e => utils_1.isElementAst(e) && e.name === 'ion-back-button');
                if (ionBackButtonElement) {
                    found = true;
                }
            }
            if (!found) {
                const start = element.sourceSpan.start.offset;
                const length = element.name.length;
                const position = this.getSourcePosition(start) + length + 1;
                this.addFailureAt(start + 1, length, 'The back button in an ion-toolbar is no longer automatically added.');
            }
        }
        super.visitElement(element, context);
    }
}
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
    description: 'The ion-back-button is not added by default to an ion-toolbar.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
