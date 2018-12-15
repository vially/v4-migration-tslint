"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
exports.ruleName = 'ion-item-option-method-get-sliding-percent-renamed';
exports.ruleMessage = '"getSlidingPercent" has been renamed to "getSlidingRatio"';
class GetSlidingPercentRenamedWalker extends Lint.RuleWalker {
    visitCallExpression(node) {
        const expression = node.expression;
        if (expression.name && expression.name.text === 'getSlidingPercent') {
            const replacement = new Lint.Replacement(expression.name.getStart(), expression.name.getWidth(), 'getSlidingRatio');
            this.addFailure(this.createFailure(expression.name.getStart(), expression.name.getWidth(), exports.ruleMessage, replacement));
        }
    }
}
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new GetSlidingPercentRenamedWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'getSlidingPercent is now called getSlidingRatio.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
};
exports.Rule = Rule;
