import * as ast from '@angular/compiler';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';

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
