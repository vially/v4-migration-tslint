"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
exports.ruleName = 'ion-radio-slot-required';
class TemplateVisitor extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
    visitElement(element, context) {
        if (element.name && element.name === 'ion-radio') {
            const attributeFound = element.attrs.find(attr => attr.name === 'slot');
            if (!attributeFound) {
                const start = element.sourceSpan.start.offset;
                const length = element.name.length;
                const position = this.getSourcePosition(start) + length + 1;
                this.addFailureAt(start + 1, length, 'The slot attribute of ion-radio is required. Use slot="start".', [
                    Lint.Replacement.replaceFromTo(position, position, ' slot="start"')
                ]);
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
    description: 'The slot attribute of ion-radio is now required.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
