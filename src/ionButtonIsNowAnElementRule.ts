import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-button-is-now-an-element';

// const getReplacements = (text: ast.ElementAst, absolutePosition: number) => {
//   const content: string = text.sourceSpan.start.file.content;

//   const results = InvalidSyntaxBoxRe.exec(content);

//   let match = undefined;
//   const newLineRegex = new RegExp(/\n/g, 'g');

//   const newlineLocations = [];

//   do {
//     match = newLineRegex.exec(content);

//     if (match) {
//       newlineLocations.push(match.index);
//     }
//   } while (match);

//   let startingLine = text.sourceSpan.start.line;
//   let endingLine = text.endSourceSpan.end.line;

//   let endingCol = text.endSourceSpan.end.col;

//   let length = 0;

//   if (endingLine > startingLine) {
//     for (let i = startingLine; i <= endingLine; i++) {
//       if (i === startingLine) {
//         length += newlineLocations[i] - text.sourceSpan.start.col;
//       } else if (i - 1 === endingLine) {
//         length += text.endSourceSpan.end.col - 1;
//       } else {
//         length += getLineLength(newlineLocations, i);
//       }
//     }
//   } else {
//     length = text.endSourceSpan.end.col - text.sourceSpan.start.col;
//   }

//   return [new Lint.Replacement(absolutePosition, length, `${ValidSyntaxOpen}${results[1].trim()}${ValidSyntaxClose}`)];
// };

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

        this.addFailure(this.createFailure(start, 10, error /*, getReplacements(element, absolutePosition)*/));
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
