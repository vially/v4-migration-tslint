"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementAst(node) {
    const n = node;
    return n && typeof n.children === 'object' && typeof n.name === 'string' && typeof n.attrs === 'object';
}
exports.isElementAst = isElementAst;
