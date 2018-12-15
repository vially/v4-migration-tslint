import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';
import { isValidForRule } from './helpers/parametersRenamed';
export const ruleName = 'ion-overlay-method-create-arguments-changed';
export const ruleMessage = `The create method of overlay controllers now accepts only one argument.`;

const matchingControllers = ['ModalController', 'PopoverController'];

class CreateMethodArgumentsChangedWalker extends Lint.RuleWalker {
  visitCallExpression(node: ts.CallExpression) {
    if (node.arguments.length > 0) {
      if (
        isValidForRule(node, 'create', ...matchingControllers) &&
        (node.arguments.length > 1 || !tsutils.isObjectLiteralExpression(node.arguments[0]))
      ) {
        const replacements = [`component: ${node.arguments[0].getText()}`];
        if (node.arguments.length >= 2) {
          replacements.push(`componentProps: ${node.arguments[1].getText()}`);
        }
        if (node.arguments.length >= 3) {
          replacements.push(`...${node.arguments[2].getText()}`);
        }

        const replacementText = `{${replacements.join(', ')}}`;
        const replacement =
          node.arguments.length <= 3
            ? this.createReplacement(node.arguments.pos, node.arguments.end - node.arguments.pos, replacementText)
            : null;

        this.addFailureAt(node.arguments.pos, node.arguments.end - node.arguments.pos, ruleMessage, replacement);
      }
    }

    super.visitCallExpression(node);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'You must pass a single argument to the create method for the following controllers: ' + matchingControllers.join(', '),
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new CreateMethodArgumentsChangedWalker(sourceFile, this.getOptions()));
  }
}
