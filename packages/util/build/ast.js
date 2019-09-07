"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getASTAt = function (ast, path) {
    if (ast === void 0) { ast = null; }
    if (path === void 0) { path = ''; }
    if (!ast || !ast.fieldNodes || !ast.fieldNodes[0]) {
        return null;
    }
    var node = ast.fieldNodes[0];
    if (path.length) {
        var pathParts_1 = path.split('.');
        var i_1 = 0;
        for (; i_1 < pathParts_1.length; i_1 += 1) {
            if (node.selectionSet && node.selectionSet.selections) {
                var subNode = node.selectionSet.selections.find(function (childNode) { return childNode.name.value === pathParts_1[i_1]; });
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
        if (i_1 === pathParts_1.length) {
            return node;
        }
        return null;
    }
    return node || null;
};
exports.getSelectionAt = function (ast, path) {
    if (path === void 0) { path = ''; }
    try {
        var node = exports.getASTAt(ast, path);
        if (node) {
            return node.selectionSet.selections.map(function (field) { return field.name.value; });
        }
        return [];
    }
    catch (e) {
        return [];
    }
};
//# sourceMappingURL=ast.js.map