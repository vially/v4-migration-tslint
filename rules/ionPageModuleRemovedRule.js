"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const tsutils = require("tsutils");
exports.ruleName = 'ion-page-module-removed';
exports.ruleMessage = `The IonicPage modules have been removed.`;
const ionicModuleSpecifiers = ['@ionic/angular', 'ionic-angular'];
const ionicPageImports = ['IonicPage', 'IonicPageModule'];
class RuleWalker extends Lint.RuleWalker {
    visitImportDeclaration(node) {
        const { moduleSpecifier } = node;
        if (tsutils.isStringLiteral(moduleSpecifier) && ionicModuleSpecifiers.includes(moduleSpecifier.text)) {
            const { namedBindings } = node.importClause;
            if (tsutils.isNamedImports(namedBindings)) {
                const { elements } = namedBindings;
                if (elements.some(element => ionicPageImports.includes(element.name.text))) {
                    const remainingImports = elements
                        .filter(element => !ionicPageImports.includes(element.name.text))
                        .map(element => element.name.text);
                    if (remainingImports.length === 0) {
                        this.addFailureAtNode(elements[0], exports.ruleMessage, this.deleteText(node.getFullStart(), node.getFullWidth()));
                    }
                    else {
                        const replacementText = ' ' + remainingImports.join(', ');
                        const replacement = this.createReplacement(elements.pos, elements.end - elements.pos, replacementText);
                        this.addFailureAt(elements.pos, elements.end - elements.pos, exports.ruleMessage, replacement);
                    }
                }
            }
        }
        super.visitImportDeclaration(node);
    }
    visitClassDeclaration(node) {
        const ionicPageDecorator = findClassDecorator(node, 'IonicPage');
        if (ionicPageDecorator) {
            const replacement = this.deleteText(ionicPageDecorator.getFullStart(), ionicPageDecorator.getFullWidth());
            this.addFailureAtNode(ionicPageDecorator, exports.ruleMessage, replacement);
        }
        super.visitClassDeclaration(node);
    }
    visitArrayLiteralExpression(node) {
        if (node.elements.some(isIonicPageModuleForChildCallExpression)) {
            const remainingElements = node.elements
                .filter(element => !isIonicPageModuleForChildCallExpression(element))
                .map(element => element.getText());
            const replacementText = `[${remainingElements.join(', ')}]`;
            const replacement = this.createReplacement(node.getStart(), node.getWidth(), replacementText);
            this.addFailureAtNode(node, exports.ruleMessage, replacement);
        }
        super.visitArrayLiteralExpression(node);
    }
}
function isIonicPageModuleForChildCallExpression(node) {
    return (tsutils.isCallExpression(node) &&
        tsutils.isPropertyAccessExpression(node.expression) &&
        tsutils.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === 'IonicPageModule' &&
        tsutils.isIdentifier(node.expression.name) &&
        node.expression.name.text === 'forChild');
}
function findClassDecorator(node, decoratorName) {
    return node.decorators
        ? node.decorators.find(decorator => tsutils.isCallExpression(decorator.expression) &&
            tsutils.isIdentifier(decorator.expression.expression) &&
            decorator.expression.expression.text === decoratorName)
        : null;
}
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new RuleWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'IonicPage modules have been removed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
};
exports.Rule = Rule;
