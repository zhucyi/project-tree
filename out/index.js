"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traverse_1 = require("./traverse");
const path_1 = require("path");
const fs_1 = require("fs");
class default_1 {
    constructor(_vscode) {
        this.vscode = _vscode;
        this.name = _vscode.workspace.name;
        this.folder = _vscode.workspace.rootPath.replace(this.name, '');
        this.levInfos = traverse_1.traverse(this.folder, this.name, 0) || [];
    }
    initLines() {
        let maxLength = 0;
        this.lines = this.levInfos.map(({ pathName, level }) => {
            let line = '';
            line += new Array(level).join('| ');
            line += level === 0 ? '' : '|-';
            const lineName = line + pathName;
            maxLength =
                lineName.length > maxLength ? lineName.length : maxLength;
            return lineName;
        });
        this.initContext(maxLength);
    }
    initContext(maxLen) {
        const configuration = this.vscode.workspace.getConfiguration();
        let commentDistance = configuration.get('ProjectTree.commentDistance') || 1;
        this.context = '\r\n```\r\n';
        this.lines.forEach((item) => {
            this.context += `${item}${new Array(maxLen - item.length + 1 + commentDistance).join(' ')}//\r\n`;
        });
        this.context += '\r\n```';
    }
    action() {
        this.initLines();
        fs_1.appendFileSync(path_1.resolve(this.vscode.workspace.rootPath, 'README.md'), this.context);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map