"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
const utils_1 = require("./helpers/utils");
const directive = 'ion-button';
const description = 'Buttons within ion-item-options are now ion-item-option elements instead of Angular directives.';
exports.ruleName = 'ion-item-option-is-now-an-element';
class TemplateVisitor extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
    visitElement(element, context) {
        if (element.name === 'ion-item-options') {
            for (const child of element.children) {
                if (utils_1.isElementAst(child)) {
                    if (child.name === 'button' && child.attrs.find(attr => attr.name === directive)) {
                        const start = child.sourceSpan.start.offset + 1;
                        this.addFailureAt(start, child.name.length, description);
                    }
                }
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
    description: description,
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
