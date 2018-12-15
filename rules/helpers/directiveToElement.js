"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
function generateDescription(directive, resultantElement) {
    return `${directive} is now an ${resultantElement} element instead of an Angular directive.`;
}
exports.generateDescription = generateDescription;
function createDirectiveToElementTemplateVisitorClass(directive, resultantElement, level, resultantAttribute) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            const foundAttr = element.attrs.find(attr => attr.name === directive);
            if (foundAttr) {
                const shouldApplyValueFix = !!resultantAttribute && foundAttr.value;
                const attributeStart = foundAttr.sourceSpan.start.offset;
                const attributeLength = shouldApplyValueFix ? foundAttr.sourceSpan.toString().length : directive.length;
                const attributePosition = this.getSourcePosition(attributeStart);
                const fixes = [Lint.Replacement.deleteFromTo(attributePosition - 1, attributePosition + attributeLength)];
                switch (level) {
                    case 'parent':
                        const valueAttribute = shouldApplyValueFix ? ` ${resultantAttribute}="${foundAttr.value}"` : '';
                        const parentOpenTag = `<${resultantElement}${valueAttribute}>\n`;
                        const parentCloseTag = `\n</${resultantElement}>`;
                        const angleBracketStartPosition = this.getSourcePosition(element.sourceSpan.start.offset);
                        const closingAngleBracketEndPosition = this.getSourcePosition(element.endSourceSpan.end.offset);
                        fixes.push(Lint.Replacement.replaceFromTo(angleBracketStartPosition, angleBracketStartPosition, parentOpenTag), Lint.Replacement.replaceFromTo(closingAngleBracketEndPosition, closingAngleBracketEndPosition, parentCloseTag));
                        break;
                    case 'same':
                        const tagNameLength = element.name.length;
                        const tagNameStartPosition = this.getSourcePosition(element.sourceSpan.start.offset) + 1;
                        const closingTagNameStartPosition = this.getSourcePosition(element.endSourceSpan.start.offset) + 2;
                        fixes.push(Lint.Replacement.replaceFromTo(tagNameStartPosition, tagNameStartPosition + tagNameLength, resultantElement), Lint.Replacement.replaceFromTo(closingTagNameStartPosition, closingTagNameStartPosition + tagNameLength, resultantElement));
                        break;
                    case 'child':
                        const childOpenTag = `>\n<${resultantElement}>`;
                        const childCloseTag = `</${resultantElement}>\n<`;
                        const angleBracketEndPosition = this.getSourcePosition(element.sourceSpan.end.offset);
                        const closingAngleBracketStartPosition = this.getSourcePosition(element.endSourceSpan.start.offset);
                        fixes.push(Lint.Replacement.replaceFromTo(angleBracketEndPosition - 1, angleBracketEndPosition, childOpenTag), Lint.Replacement.replaceFromTo(closingAngleBracketStartPosition, closingAngleBracketStartPosition + 1, childCloseTag));
                        break;
                }
                this.addFailureAt(attributeStart, attributeLength, generateDescription(directive, resultantElement), fixes);
            }
            super.visitElement(element, context);
        }
    };
}
exports.createDirectiveToElementTemplateVisitorClass = createDirectiveToElementTemplateVisitorClass;
function createDirectiveToElementRuleClass(ruleName, directive, resultantElement = directive, level = 'same', resultantAttribute) {
    var _a;
    return _a = class extends Lint.Rules.AbstractRule {
            apply(sourceFile) {
                return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
                    templateVisitorCtrl: createDirectiveToElementTemplateVisitorClass(directive, resultantElement, level, resultantAttribute)
                }));
            }
        },
        _a.metadata = {
            ruleName: ruleName,
            type: 'functionality',
            description: generateDescription(directive, resultantElement),
            options: null,
            optionsDescription: 'Not configurable.',
            typescriptOnly: false,
            hasFix: true
        },
        _a;
}
exports.createDirectiveToElementRuleClass = createDirectiveToElementRuleClass;
