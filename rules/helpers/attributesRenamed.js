"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
function generateErrorMessage(elementName, attrName, replacement) {
    return `The ${attrName} attribute of ${elementName} has been renamed. Use ${replacement} instead.`;
}
function createAttributesRenamedTemplateVisitorClass(elementNames, replacementMap) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            if (!elementNames || elementNames.includes(element.name)) {
                this.checkAttributesForReplacements(element);
            }
            super.visitElement(element, context);
        }
        checkAttributesForReplacements(element) {
            for (const attr of element.attrs) {
                const replacement = replacementMap.get(attr.name);
                if (replacement) {
                    const start = attr.sourceSpan.start.offset;
                    const length = attr.name.length;
                    const position = this.getSourcePosition(start);
                    this.addFailureAt(start, length, generateErrorMessage(element.name, attr.name, replacement), [
                        Lint.Replacement.replaceFromTo(position, position + length, replacement)
                    ]);
                }
            }
        }
    };
}
exports.createAttributesRenamedTemplateVisitorClass = createAttributesRenamedTemplateVisitorClass;
