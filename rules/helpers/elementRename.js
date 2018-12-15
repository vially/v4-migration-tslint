"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
function generateDescription(elementName, newElementName) {
    return `The ${elementName} component is now named ${newElementName}.`;
}
function createElementRenameTemplateVisitorClass(elementName, newElementName) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            if (element.name && element.name === elementName) {
                const startTagStart = element.sourceSpan.start.offset;
                const startTagLength = element.name.length;
                const startTagPosition = this.getSourcePosition(startTagStart) + 1;
                const endTagStart = element.endSourceSpan.start.offset;
                const endTagLength = element.name.length;
                const endTagPosition = this.getSourcePosition(endTagStart) + 2;
                this.addFailureAt(startTagStart + 1, startTagLength, generateDescription(element.name, newElementName), [
                    Lint.Replacement.replaceFromTo(startTagPosition, startTagPosition + startTagLength, newElementName),
                    Lint.Replacement.replaceFromTo(endTagPosition, endTagPosition + endTagLength, newElementName)
                ]);
            }
            super.visitElement(element, context);
        }
    };
}
exports.createElementRenameTemplateVisitorClass = createElementRenameTemplateVisitorClass;
function createElementRenameRuleClass(ruleName, elementName, newElementName) {
    var _a;
    return _a = class extends Lint.Rules.AbstractRule {
            apply(sourceFile) {
                return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
                    templateVisitorCtrl: createElementRenameTemplateVisitorClass(elementName, newElementName)
                }));
            }
        },
        _a.metadata = {
            ruleName: ruleName,
            type: 'functionality',
            description: generateDescription(elementName, newElementName),
            options: null,
            optionsDescription: 'Not configurable.',
            typescriptOnly: false,
            hasFix: true
        },
        _a;
}
exports.createElementRenameRuleClass = createElementRenameRuleClass;
