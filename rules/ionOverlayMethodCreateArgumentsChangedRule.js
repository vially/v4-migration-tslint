"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const tsutils = require("tsutils");
const parametersRenamed_1 = require("./helpers/parametersRenamed");
exports.ruleName = 'ion-overlay-method-create-arguments-changed';
exports.ruleMessage = `The create method of overlay controllers now accepts only one argument.`;
const matchingControllers = ['ModalController', 'PopoverController'];
const optionsMap = { enableBackdropDismiss: 'backdropDismiss' };
class CreateMethodArgumentsChangedWalker extends Lint.RuleWalker {
    visitCallExpression(node) {
        if (node.arguments.length > 0) {
            if (parametersRenamed_1.isValidForRule(node, 'create', ...matchingControllers) &&
                (node.arguments.length > 1 || !tsutils.isObjectLiteralExpression(node.arguments[0]))) {
                const replacements = [`component: ${node.arguments[0].getText()}`];
                if (node.arguments.length >= 2) {
                    replacements.push(`componentProps: ${node.arguments[1].getText()}`);
                }
                if (node.arguments.length >= 3) {
                    const optionsArgument = node.arguments[2];
                    const replacementText = tsutils.isObjectLiteralExpression(optionsArgument)
                        ? optionsArgument.properties.map(mapOptionProperty).join(', ')
                        : `...${node.arguments[2].getText()}`;
                    replacements.push(replacementText);
                }
                const replacementText = `{${replacements.join(', ')}}`;
                const replacement = node.arguments.length <= 3
                    ? this.createReplacement(node.arguments.pos, node.arguments.end - node.arguments.pos, replacementText)
                    : null;
                this.addFailureAt(node.arguments.pos, node.arguments.end - node.arguments.pos, exports.ruleMessage, replacement);
            }
        }
        super.visitCallExpression(node);
    }
}
function mapOptionProperty(property) {
    const propertyName = tsutils.getPropertyName(property.name);
    if (!(propertyName in optionsMap) || (!tsutils.isShorthandPropertyAssignment(property) && !tsutils.isPropertyAssignment(property))) {
        return property.getFullText();
    }
    const replacementPropName = optionsMap[propertyName];
    const propValue = tsutils.isShorthandPropertyAssignment(property) ? propertyName : property.initializer.getText();
    return `${replacementPropName}: ${propValue}`;
}
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new CreateMethodArgumentsChangedWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'You must pass a single argument to the create method for the following controllers: ' + matchingControllers.join(', '),
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
};
exports.Rule = Rule;
