"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributesRenamed_1 = require("./helpers/attributesRenamed");
exports.ruleName = 'ion-range-attributes-renamed';
const replacementMap = new Map([
    ['range-left', 'slot="start"'],
    ['range-start', 'slot="start"'],
    ['range-right', 'slot="end"'],
    ['range-end', 'slot="end"']
]);
const TemplateVisitor = attributesRenamed_1.createAttributesRenamedTemplateVisitorClass(undefined, replacementMap);
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
    description: 'Attributes of children of ion-range have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
