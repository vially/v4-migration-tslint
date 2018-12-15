"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const tsutils = require("tsutils");
exports.ruleName = 'ion-overlay-method-dismiss-should-use-await';
exports.ruleMessage = `The onDidDismiss method of overlay controllers should use await.`;
class RuleWalker extends Lint.RuleWalker {
    visitCallExpression(node) {
        let expression = node.expression;
        if (tsutils.isPropertyAccessExpression(expression) && expression.name.text === 'onDidDismiss') {
            if (node.arguments.length > 0 ||
                (!tsutils.isAwaitExpression(node.parent) &&
                    (!tsutils.isPropertyAccessExpression(node.parent) ||
                        !tsutils.isCallExpression(node.parent.parent) ||
                        !tsutils.isPropertyAccessExpression(node.parent.parent.expression) ||
                        node.parent.parent.expression.name.text !== 'then'))) {
                const arrowFunction = node.arguments.length > 0 ? node.arguments[0] : null;
                if (node.arguments.length === 1 && tsutils.isArrowFunction(arrowFunction)) {
                    const replacementText = node.expression.getText() + `().then(overlayResult => overlayResult.data).then(${arrowFunction.getFullText()})`;
                    const replacement = this.createReplacement(node.getStart(), node.getWidth(), replacementText);
                    this.addFailureAtNode(node, exports.ruleMessage, replacement);
                }
                else {
                    this.addFailureAtNode(node, exports.ruleMessage);
                }
            }
        }
        super.visitCallExpression(node);
    }
}
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new RuleWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'You must await when calling the onDidDismiss() method of the overlay controllers.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
};
exports.Rule = Rule;
