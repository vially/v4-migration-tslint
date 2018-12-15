"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const utils_1 = require("./utils");
function createIonLabelRequiredTemplateVisitorClass(elementName) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            if (element.name && element.name === elementName) {
                const ionLabelElement = element.children.find((e) => utils_1.isElementAst(e) && e.name === 'ion-label');
                if (!ionLabelElement) {
                    const start = element.sourceSpan.start.offset;
                    const length = element.name.length;
                    const position = this.getSourcePosition(start) + length + 1;
                    this.addFailureAt(start + 1, length, `The ${elementName} requires an ion-label component. It is no longer automatically added.`);
                }
            }
            super.visitElement(element, context);
        }
    };
}
exports.createIonLabelRequiredTemplateVisitorClass = createIonLabelRequiredTemplateVisitorClass;
