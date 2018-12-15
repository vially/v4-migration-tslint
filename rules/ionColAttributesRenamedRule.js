"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributesRenamed_1 = require("./helpers/attributesRenamed");
exports.ruleName = 'ion-col-attributes-renamed';
const formatOldAttr = (prefix, breakpoint, value) => `${prefix}${typeof breakpoint === 'undefined' ? '' : `-${breakpoint}`}-${value}`;
const formatNewAttr = (prefix, breakpoint, value) => `${prefix}${typeof breakpoint === 'undefined' ? '' : `-${breakpoint}`}="${value}"`;
const attrPrefixMap = new Map([['col', 'size'], ['offset', 'offset'], ['push', 'push'], ['pull', 'pull']]);
const breakpoints = [undefined, 'xs', 'sm', 'md', 'lg', 'xl'];
const values = Array(12)
    .fill(undefined)
    .map((v, i) => String(i + 1));
const replacementPairs = [].concat(...[...attrPrefixMap.entries()].map(([oldPrefix, newPrefix]) => [].concat(...breakpoints.map(b => values.map(v => [formatOldAttr(oldPrefix, b, v), formatNewAttr(newPrefix, b, v)])))));
const replacementMap = new Map(replacementPairs);
const IonGridAttributesRenamedTemplateVisitor = attributesRenamed_1.createAttributesRenamedTemplateVisitorClass(['ion-col'], replacementMap);
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: IonGridAttributesRenamedTemplateVisitor
        }));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'Attributes of ion-col have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
