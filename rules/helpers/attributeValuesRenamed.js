"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
function generateErrorMessage(elementName, attrName, attrValue, replacement) {
    return `The ${attrName}="${attrValue}" attribute/value of ${elementName} should be written as ${replacement}.`;
}
function createAttributeValuesRenamedTemplateVisitorClass(elementNames, replacementMap) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            for (const elementName of elementNames) {
                if (element.name === elementName) {
                    for (const attr of element.attrs) {
                        const attrValueMap = replacementMap.get(attr.name);
                        if (attrValueMap) {
                            const replacementValue = attrValueMap.get(attr.value);
                            if (replacementValue) {
                                const start = attr.sourceSpan.start.offset;
                                const end = attr.sourceSpan.end.offset;
                                const position = this.getSourcePosition(start);
                                const replacement = `${attr.name}="${replacementValue}"`;
                                this.addFailureAt(start, end - start, generateErrorMessage(elementName, attr.name, attr.value, replacement), [
                                    Lint.Replacement.replaceFromTo(position, position + end - start, replacement)
                                ]);
                            }
                        }
                    }
                }
            }
            super.visitElement(element, context);
        }
    };
}
exports.createAttributeValuesRenamedTemplateVisitorClass = createAttributeValuesRenamedTemplateVisitorClass;
