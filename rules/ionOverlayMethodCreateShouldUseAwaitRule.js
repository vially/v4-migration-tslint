"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const tsutils = require("tsutils");
const parametersRenamed_1 = require("./helpers/parametersRenamed");
exports.ruleName = 'ion-overlay-method-create-should-use-await';
exports.ruleMessage = `The create method of overlay controllers now returns a promise. 
Please ensure that you are handling this promise correctly.`;
const matchingControllers = [
    'PopoverController',
    'ModalController',
    'ActionSheetController',
    'LoadingController',
    'ToastController',
    'AlertController'
];
class CreateMethodShouldUseAwaitWalker extends Lint.RuleWalker {
    visitCallExpression(node) {
        if (node.arguments.length > 0) {
            const firstArgument = node.arguments[0];
            if (parametersRenamed_1.isValidForRule(node, 'create', ...matchingControllers) && tsutils.isObjectLiteralExpression(firstArgument)) {
                if (!tsutils.isAwaitExpression(node.parent) &&
                    (!tsutils.isPropertyAccessExpression(node.parent) ||
                        !tsutils.isCallExpression(node.parent.parent) ||
                        !tsutils.isPropertyAccessExpression(node.parent.parent.expression) ||
                        node.parent.parent.expression.name.text !== 'then')) {
                    this.addFailureAtNode(node, exports.ruleMessage);
                }
            }
        }
        super.visitCallExpression(node);
    }
}
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new CreateMethodShouldUseAwaitWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'You must await the create method for the following controllers: ' + matchingControllers.join(', '),
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
};
exports.Rule = Rule;
