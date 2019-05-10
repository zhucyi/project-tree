import { WorkspaceConfiguration } from 'vscode';
import { traverse } from './traverse';
import { resolve } from 'path';
import { appendFileSync } from 'fs';
import { LevInfo } from './type';

export default class {
    private vscode: any;
    private folder: string;
    private name: string;
    private levInfos: LevInfo[];
    private lines!: string[];
    private context!: string;
    constructor(_vscode: any) {
        this.vscode = _vscode;
        this.name = _vscode.workspace.name;
        this.folder = _vscode.workspace.rootPath.replace(this.name, '');
        this.levInfos = traverse(this.folder, this.name, 0) || [];
    }
    initLines(): void {
        let maxLength: number = 0;
        this.lines = this.levInfos.map(({ pathName, level }: LevInfo) => {
            let line: string = '';
            line += new Array(level).join('| ');
            line += level === 0 ? '' : '|-';
            const lineName = line + pathName;
            maxLength =
                lineName.length > maxLength ? lineName.length : maxLength;
            return lineName;
        });
        this.initContext(maxLength);
    }
    initContext(maxLen: number): void {
        const configuration: WorkspaceConfiguration = this.vscode.workspace.getConfiguration();
        let commentDistance: number =
            configuration.get('ProjectTree.commentDistance') || 1;
        this.context = '\r\n```\r\n';
        this.lines.forEach((item: string) => {
            this.context += `${item}${new Array(
                maxLen - item.length + 1 + commentDistance
            ).join(' ')}//\r\n`;
        });
        this.context += '\r\n```';
    }
    action(): void {
        this.initLines();
        appendFileSync(
            resolve(this.vscode.workspace.rootPath, 'README.md'),
            this.context
        );
    }
}
