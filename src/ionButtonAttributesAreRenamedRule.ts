import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-button-attributes-are-renamed';

class IonButtonAttributesAreRenamedTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-button') {
      element.attrs.forEach(attribute => {
        let message = '';

        switch (attribute.name) {
          case 'icon-left':
          case 'icon-start':
            message = `${attribute.name} has been replaced by the slot="start" attribute.`;
            break;

          case 'icon-right':
          case 'icon-end':
            message = `${attribute.name} has been replaced by the slot="end" attribute.`;
            break;

          case 'small':
          case 'large':
            message = `${attribute.name} has been replaced by the size attribute.`;
            break;

          case 'clear':
          case 'outline':
          case 'solid':
            message = `${attribute.name} has been replaced by the fill attribute.`;
            break;

          case 'full':
          case 'block':
            message = `${attribute.name} has been replaced by the expand attribute.`;
            break;
        }

        if (message) {
          const start = attribute.sourceSpan.start.offset;
          //const absolutePosition = this.getSourcePosition(start - 1);

          this.addFailure(this.createFailure(start, attribute.name.length, message));
        }
      });
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Existing Ion Button attributes have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonButtonAttributesAreRenamedTemplateVisitor
      })
    );
  }
}
