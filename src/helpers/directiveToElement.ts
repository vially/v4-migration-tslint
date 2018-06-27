import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export function generateDescription(directive: string) {
  return `${directive} is now an Element instead of an Angular Directive.`;
}

export function createDirectiveToElementTemplateVisitorClass(directive: string) {
  return class extends BasicTemplateAstVisitor {
    visitElement(element: ast.ElementAst, context: any): any {
      if (element.name) {
        const InvalidSyntaxBoxRe = new RegExp(`<\\w+[\\s\\S]+?(${directive})[\\s\\S]*?>`, 'gi');

        let error = generateDescription(directive);

        const expr = element.sourceSpan.toString();

        let matches;

        while ((matches = InvalidSyntaxBoxRe.exec(expr)) !== null) {
          const index = expr.indexOf(directive);
          const start = element.sourceSpan.start.offset + index;
          const absolutePosition = this.getSourcePosition(start - 1);

          this.addFailure(this.createFailure(start, directive.length, error));
        }
      }

      super.visitElement(element, context);
    }
  };
}

export function createDirectiveToElementRuleClass(ruleName: string, directive: string) {
  return class extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
      ruleName: ruleName,
      type: 'functionality',
      description: generateDescription(directive),
      options: null,
      optionsDescription: 'Not configurable.',
      typescriptOnly: false,
      hasFix: true
    };

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
      return this.applyWithWalker(
        new NgWalker(sourceFile, this.getOptions(), {
          templateVisitorCtrl: createDirectiveToElementTemplateVisitorClass(directive)
        })
      );
    }
  };
}
