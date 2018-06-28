import * as utils from 'tsutils';
import * as Lint from 'tslint';
import { IOptions, Replacement } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-alert-method-create-parameters-renamed';

const parameterReplacementMap = new Map([['title', 'header'], ['subTitle', 'subHeader']]);

export class Rule extends Lint.Rules.TypedRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'AlertController now takes in different parameters to its create method.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    requiresTypeInfo: true,
    hasFix: true
  };

  public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
  }
}

function walk(ctx: Lint.WalkContext<void>, checker: ts.TypeChecker): void {
  const cb = (node: ts.Node) => {
    const sf = node.getSourceFile();

    if (sf.fileName !== '/Users/dan/apps/angular/lintz/src/app/pages/home/home.page.ts') {
      return;
    }

    if (utils.isCallExpression(node)) {
      const type = checker.getTypeAtLocation(node.expression);
      debugger;

      // TODO: inspect type

      // for (const argument of node.arguments[0].properties) {
      //   debugger;
      //   const name = argument.name.text;
      //   const replacementName = parameterReplacementMap.get(name);

      //   if (replacementName) {
      //     const errorMessage = `The ${argument.name.text} parameter has been replaced by ${replacementName}.`;
      //     const replacement = new Replacement(argument.name.getStart(), argument.name.getWidth(), replacementName);

      //     this.addFailure(this.createFailure(argument.name.getStart(), argument.name.getWidth(), errorMessage, [replacement]));
      //   }
      // }
    }

    ts.forEachChild(node, cb);
  };

  ts.forEachChild(ctx.sourceFile, cb);
}
