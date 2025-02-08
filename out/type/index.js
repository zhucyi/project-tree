"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = exports.File = void 0;
class File {
    ancestor;
    pathName;
    level;
    constructor(ancestor, pathName, level) {
        this.ancestor = ancestor;
        this.pathName = pathName;
        this.level = level;
    }
    getAncestor() {
        return this.ancestor;
    }
    getPathName() {
        return this.pathName;
    }
    getLevel() {
        return this.level;
    }
}
exports.File = File;
class Folder {
    ancestor;
    pathName;
    level;
    children;
    constructor(ancestor = '', pathName = '', level = 0, children = []) {
        this.ancestor = ancestor;
        this.pathName = pathName;
        this.level = level;
        this.children = children;
    }
    getAncestor() {
        return this.ancestor;
    }
    getPathName() {
        return this.pathName;
    }
    getLevel() {
        return this.level;
    }
    getChildren() {
        return this.children;
    }
    addChild(child) {
        this.children.push(child);
    }
}
exports.Folder = Folder;
//# sourceMappingURL=index.js.map