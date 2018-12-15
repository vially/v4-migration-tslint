"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const ts = require("typescript");
exports.ruleName = 'ion-datetime-capitalization-changed';
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new UpdateImportsWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'Updates the Datetime import',
    rationale: 'Datetime exported symbol has changed',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true
};
Rule.RuleFailure = 'outdated import path';
exports.Rule = Rule;
class UpdateImportsWalker extends Lint.RuleWalker {
    visitImportDeclaration(node) {
        if (ts.isStringLiteral(node.moduleSpecifier) && node.importClause) {
            const specifier = node.moduleSpecifier;
            const path = specifier.text;
            const start = specifier.getStart() + 1;
            const end = specifier.text.length;
            const replacementStart = start;
            const replacementEnd = specifier.text.length;
            let replacement = null;
            // Try to find updated symbol names.
            ImportReplacements.forEach(r => (r.path === path ? this._migrateExportedSymbols(r, node) : void 0));
            // Try to migrate entire import path updates.
            if (ImportMap.has(path)) {
                replacement = ImportMap.get(path);
            }
            if (replacement !== null) {
                return this.addFailureAt(start, end, Rule.RuleFailure, this.createReplacement(replacementStart, replacementEnd, replacement));
            }
        }
    }
    _migrateExportedSymbols(re, node) {
        const importClause = node.importClause;
        const bindings = importClause.namedBindings;
        if (!bindings || bindings.kind !== ts.SyntaxKind.NamedImports) {
            return;
        }
        bindings.elements.forEach((e) => {
            if (!e || e.kind !== ts.SyntaxKind.ImportSpecifier) {
                return;
            }
            let toReplace = e.name;
            // We don't want to introduce type errors so we alias the old new symbol.
            let replacement = `${re.newSymbol} as ${re.symbol}`;
            if (e.propertyName) {
                toReplace = e.propertyName;
                replacement = re.newSymbol;
            }
            if (toReplace.getText() !== re.symbol) {
                return;
            }
            return this.addFailureAt(toReplace.getStart(), toReplace.getWidth(), 'imported symbol no longer exists', this.createReplacement(toReplace.getStart(), toReplace.getWidth(), replacement));
        });
    }
}
const ImportMap = new Map([['ionic-angular', '@ionic/angular']]);
const ImportReplacements = [
    {
        path: 'ionic-angular',
        symbol: 'DateTime',
        newPath: '@ionic/angular',
        newSymbol: 'Datetime'
    },
    {
        path: '@ionic/angular',
        symbol: 'DateTime',
        newPath: '@ionic/angular',
        newSymbol: 'Datetime'
    }
];
