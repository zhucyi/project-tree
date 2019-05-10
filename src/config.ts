import { WorkspaceConfiguration } from 'vscode';

export default class Config {
    withComment: boolean = false;
    commentDistance: number = 5;
    theme: string = 'perfect';
    constructor(_vscode: any) {
        const configuration: WorkspaceConfiguration = _vscode.workspace.getConfiguration();
        this.withComment = !!configuration.get('ProjectTree.withComment');
        this.commentDistance =
            configuration.get('ProjectTree.commentDistance') || 1;
        this.theme = configuration.get('ProjectTree.theme') || this.theme;
    }
}
