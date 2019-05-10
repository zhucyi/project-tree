import { traverse } from './traverse';
import { resolve } from 'path';
import { appendFileSync } from 'fs';
import { LevInfo } from './type';
import theme from './theme';
import Config from './config';

export default class {
    private vscode: any;
    private folder: string;
    private name: string;
    private levInfos: LevInfo[];
    private lines!: string[];
    private context!: string;
    private config!: Config;
    constructor(_vscode: any) {
        this.vscode = _vscode;
        this.name = _vscode.workspace.name;
        this.folder = _vscode.workspace.rootPath.replace(this.name, '');
        this.levInfos = traverse(this.folder, this.name, 0) || [];
        this.config = new Config(_vscode);
    }
    initLines(): void {
        const themFunc: any = {
            normal: theme.normal,
            perfect: theme.perfect
        };
        const { maxLen, lines } = (themFunc[this.config.theme] ||
            theme.perfect)(this.levInfos);
        this.lines = lines;
        this.initContext(maxLen);
    }
    initContext(maxLen: number): void {
        this.context = '\r\n```\r\n';
        this.lines.forEach((item: string) => {
            this.context += `${item}${new Array(
                maxLen - item.length + 1 + this.config.commentDistance
            ).join(' ')}${this.config.withComment ? '//' : ''}\r\n`;
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
