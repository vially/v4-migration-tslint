"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
exports.ruleName = 'ion-icon-attribute-is-active-removed';
class TemplateVisitor extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
    visitElement(element, context) {
        if (element.name && element.name === 'ion-icon') {
            const attributeFound = element.attrs.find(attr => attr.name === 'isActive');
            if (attributeFound) {
                const start = attributeFound.sourceSpan.start.offset;
                const end = attributeFound.sourceSpan.end.offset;
                this.addFailureAt(start, end - start, 'The isActive attribute of ion-icon has been removed.');
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
    description: 'The isActive attribute of ion-icon has been removed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
