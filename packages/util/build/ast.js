"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getASTAt = (ast = null, path = '') => {
    if (!ast || !ast.fieldNodes || !ast.fieldNodes[0]) {
        return null;
    }
    let node = ast.fieldNodes[0];
    if (path.length) {
        const pathParts = path.split('.');
        let i = 0;
        for (; i < pathParts.length; i += 1) {
            if (node.selectionSet && node.selectionSet.selections) {
                const subNode = node.selectionSet.selections.find(childNode => childNode.name.value === pathParts[i]);
                if (subNode) {
                    node = subNode;
                }
                else {
                    return null;
                }
            }
            else {
                break;
            }
        }
        if (i === pathParts.length) {
            return node;
        }
        return null;
    }
    return node || null;
};
exports.getSelectionAt = (ast, path = '') => {
    try {
        const node = exports.getASTAt(ast, path);
        if (node) {
            return node.selectionSet.selections.map(field => field.name.value);
        }
        return [];
    }
    catch (e) {
        return [];
    }
};
//# sourceMappingURL=ast.js.map