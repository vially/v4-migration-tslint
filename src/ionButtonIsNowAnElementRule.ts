import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-button-is-now-an-element';

class IonButtonIsNowAnElementTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name) {
      const InvalidSyntaxBoxRe = /<(\w+)(?:[a-zA-Z\"\=]|\s)*(ion-button)(?:[a-zA-Z\"\=]|\s)*>/gis;

      let error = 'Ion Button is now an Element instead of an attribute.';

      const expr: any = (<any>element.sourceSpan).toString();

      let matches;

      while ((matches = InvalidSyntaxBoxRe.exec(expr)) !== null) {
        const index = expr.indexOf('ion-button');
        const start = element.sourceSpan.start.offset + index;
        const absolutePosition = this.getSourcePosition(start - 1);

        this.addFailure(this.createFailure(start, 10, error));
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Ion Button is now an Element instead of an attribute.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  constructor(options: IOptions) {
    options.ruleSeverity = 'error';
    super(options);
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonButtonIsNowAnElementTemplateVisitor
      })
    );
  }
}
