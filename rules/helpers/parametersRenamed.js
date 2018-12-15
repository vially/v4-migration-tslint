"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const tsutils = require("tsutils");
const ts = require("typescript");
/**
 * Currently only supports a call exactly like this:
 *
 * ```
 * this.ctrl.foo({ prop1: <value>, prop2: <value> })
 * ```
 *
 * `this.ctrl` must refer to a provider by name in the constructor of a class
 * using Angular dependency injection
 *
 * @param methodName would be `foo` in example above
 * @param providerName the provider class name
 * @param parameterMap a map of properties to rename in the object literal above
 */
function createParametersRenamedClass(methodName, providerName, parameterMap) {
    return class extends Lint.RuleWalker {
        visitCallExpression(node) {
            if (node.arguments.length > 0) {
                const firstArgument = node.arguments[0];
                if (isValidForRule(node, methodName, providerName) && tsutils.isObjectLiteralExpression(firstArgument)) {
                    for (const prop of firstArgument.properties) {
                        if (tsutils.isPropertyAssignment(prop) || tsutils.isShorthandPropertyAssignment(prop)) {
                            const propName = tsutils.getPropertyName(prop.name);
                            const replacementPropName = parameterMap.get(propName);
                            if (replacementPropName) {
                                const replacement = tsutils.isShorthandPropertyAssignment(prop)
                                    ? `${replacementPropName}: ${propName}`
                                    : replacementPropName;
                                this.addFailureAtNode(prop.name, `Property ${propName} has been renamed to ${replacementPropName}.`, new Lint.Replacement(prop.name.getStart(), prop.name.getWidth(), replacement));
                            }
                        }
                    }
                }
            }
            super.visitCallExpression(node);
        }
    };
}
exports.createParametersRenamedClass = createParametersRenamedClass;
function isValidForRule(node, methodName, ...providerNames) {
    const expression = node.expression;
    if (tsutils.isPropertyAccessExpression(expression) &&
        expression.name.text === methodName &&
        tsutils.isPropertyAccessExpression(expression.expression) &&
        expression.expression.expression.kind === ts.SyntaxKind.ThisKeyword) {
        const classNode = findDeclarativeClass(node);
        const controllerName = expression.expression.name.text;
        if (classNode) {
            const constructorNode = classNode.members.find(n => tsutils.isConstructorDeclaration(n));
            if (constructorNode && tsutils.isConstructorDeclaration(constructorNode)) {
                const controllerParameter = constructorNode.parameters.find(p => tsutils.isTypeReferenceNode(p.type) && tsutils.isIdentifier(p.name) && p.name.text === controllerName);
                if (controllerParameter &&
                    tsutils.isTypeReferenceNode(controllerParameter.type) &&
                    tsutils.isIdentifier(controllerParameter.type.typeName) &&
                    providerNames.indexOf(controllerParameter.type.typeName.text) > -1) {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.isValidForRule = isValidForRule;
function findDeclarativeClass(node) {
    if (!node) {
        return;
    }
    if (tsutils.isClassDeclaration(node)) {
        return node;
    }
    return findDeclarativeClass(node.parent);
}
