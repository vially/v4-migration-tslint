import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

export const ruleName = 'ion-page-module-removed';
export const ruleMessage = `The IonicPage modules have been removed.`;

const ionicModuleSpecifiers = ['@ionic/angular', 'ionic-angular'];
const ionicPageImports = ['IonicPage', 'IonicPageModule'];

class RuleWalker extends Lint.RuleWalker {
  visitImportDeclaration(node: ts.ImportDeclaration) {
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
            this.addFailureAtNode(elements[0], ruleMessage, this.deleteText(node.getFullStart(), node.getFullWidth()));
          } else {
            const replacementText = ' ' + remainingImports.join(', ');
            const replacement = this.createReplacement(elements.pos, elements.end - elements.pos, replacementText);
            this.addFailureAt(elements.pos, elements.end - elements.pos, ruleMessage, replacement);
          }
        }
      }
    }

    super.visitImportDeclaration(node);
  }

  visitClassDeclaration(node: ts.ClassDeclaration) {
    const ionicPageDecorator = findClassDecorator(node, 'IonicPage');
    if (ionicPageDecorator) {
      const replacement = this.deleteText(ionicPageDecorator.getFullStart(), ionicPageDecorator.getFullWidth());
      this.addFailureAtNode(ionicPageDecorator, ruleMessage, replacement);
    }

    super.visitClassDeclaration(node);
  }

  visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    if (node.elements.some(isIonicPageModuleForChildCallExpression)) {
      const remainingElements = node.elements
        .filter(element => !isIonicPageModuleForChildCallExpression(element))
        .map(element => element.getText());
      const replacementText = `[${remainingElements.join(', ')}]`;
      const replacement = this.createReplacement(node.getStart(), node.getWidth(), replacementText);
      this.addFailureAtNode(node, ruleMessage, replacement);
    }

    super.visitArrayLiteralExpression(node);
  }
}

function isIonicPageModuleForChildCallExpression(node: ts.Expression): boolean {
  return (
    tsutils.isCallExpression(node) &&
    tsutils.isPropertyAccessExpression(node.expression) &&
    tsutils.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === 'IonicPageModule' &&
    tsutils.isIdentifier(node.expression.name) &&
    node.expression.name.text === 'forChild'
  );
}

function findClassDecorator(node: ts.ClassDeclaration, decoratorName: string): ts.Decorator {
  return node.decorators
    ? node.decorators.find(
        decorator =>
          tsutils.isCallExpression(decorator.expression) &&
          tsutils.isIdentifier(decorator.expression.expression) &&
          decorator.expression.expression.text === decoratorName
      )
    : null;
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'IonicPage modules have been removed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new RuleWalker(sourceFile, this.getOptions()));
  }
}
