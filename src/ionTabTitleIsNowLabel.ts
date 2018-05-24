import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-tab-title-is-now-label';


class IonNavbarIsNowIonToolbarTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name) {
      let error = null;

      if (element.name === 'ion-navbar') {
        error = 'ion-navbar is no longer used. Please use ion-toolbar.';
      }

      if (error) {
        const expr: any = (<any>element.sourceSpan).toString();
        const internalStart = expr.indexOf(InvalidSyntaxBoxOpen) + 1;
        const start = element.sourceSpan.start.offset + internalStart;
        const absolutePosition = this.getSourcePosition(start - 1);

        this.addFailure(this.createFailure(start, expr.trim().length, error/*, getReplacements(element, absolutePosition)*/));
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Ion Navbar has been removed and Ion Toolbar is now the recommended component.',
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
        templateVisitorCtrl: IonNavbarIsNowIonToolbarTemplateVisitor
      })
    );
  }
}
function getLineLength(newlineLocations: any[], i: number) {
  if (i > 0) {
    return newlineLocations[i] - newlineLocations[i - 1];
  }

  return newlineLocations[i];
}
