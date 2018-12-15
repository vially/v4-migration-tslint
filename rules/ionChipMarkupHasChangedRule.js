"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast = require("@angular/compiler");
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
exports.ruleName = 'ion-chip-markup-has-changed';
class IonChipMarkupChangedTemplateVisitor extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
    visitElement(element, context) {
        if (element.name && element.name === 'ion-chip') {
            element.children.forEach(child => {
                if (child instanceof ast.ElementAst && child.name === 'ion-button') {
                    const start = child.sourceSpan.start.offset;
                    this.addFailure(this.createFailure(start + 1, child.name.length, 'Inside of ion-chip, ion-chip-button must be used instead of ion-button.'));
                }
            });
        }
        super.visitElement(element, context);
    }
}
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: IonChipMarkupChangedTemplateVisitor
        }));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'Buttons in Ion Chip have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
