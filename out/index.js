"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const traverse_1 = require("./traverse");
const path_1 = require("path");
const fs_1 = require("fs");
const type_1 = require("./type");
const theme_1 = __importDefault(require("./theme"));
const config_1 = __importDefault(require("./config"));
class default_1 {
    folder;
    name;
    rootFolder;
    levInfos;
    lines;
    context;
    config;
    constructor() {
        this.config = new config_1.default();
    }
    async init() {
        const { workspaceFolders } = vscode_1.workspace;
        let selectFolder;
        if (!workspaceFolders) {
            vscode_1.window.showInformationMessage('Please open the folder and try again.');
            return;
        }
        if (workspaceFolders.length === 1) {
            selectFolder = workspaceFolders[0];
        }
        else {
            let name;
            try {
                name = await this.pickFolder(workspaceFolders);
            }
            catch (e) {
                vscode_1.window.showInformationMessage('Please open the folder and try again.');
            }
            selectFolder =
                workspaceFolders.find((item) => item.name === name) ||
                    workspaceFolders[0];
        }
        this.name = selectFolder.name;
        this.folder = selectFolder.uri.fsPath.replace(this.name, '');
        this.rootFolder = (0, traverse_1.traverseFolder)(this.folder, this.name) || new type_1.Folder();
    }
    initLines() {
        this.levInfos = (0, traverse_1.traverse)(this.rootFolder) || [];
        const themFunc = {
            normal: theme_1.default.normal,
            perfect: theme_1.default.perfect,
        };
        const { maxLen, lines } = (themFunc[this.config.theme] || theme_1.default.perfect)(this.levInfos);
        this.lines = lines;
        this.initContext(maxLen);
    }
    initContext(maxLen) {
        this.context = '\r\n```\r\n';
        this.lines.forEach((item) => {
            if (this.config.withComment) {
                this.context += `${item}${new Array(maxLen - item.length + 1 + this.config.commentDistance).join(' ')}//\r\n`;
            }
            else {
                this.context += `${item}\r\n`;
            }
        });
        this.context += '\r\n```';
    }
    /**
     * pick工作区的文件夹
     * @param workspaceFolders 待选文件夹
     */
    pickFolder(workspaceFolders) {
        const folders = workspaceFolders.map((item) => item.name);
        return new Promise((res, rej) => {
            vscode_1.window
                .showQuickPick(folders, {
                placeHolder: 'choose folder to modify README.md',
                ignoreFocusOut: true,
            })
                .then((folderName) => {
                if (folderName) {
                    return res(folderName);
                }
                return rej();
            });
        });
    }
    async action() {
        await this.init();
        if (!this.rootFolder) {
            return;
        }
        this.initLines();
        (0, fs_1.appendFileSync)((0, path_1.resolve)((0, path_1.resolve)(this.folder, this.name), this.config.distFileName), this.context);
        vscode_1.window.showInformationMessage('Your README.md has been modified!');
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map