import { WorkspaceConfiguration, workspace } from 'vscode';

let config!: Config;
export default class Config {
    withComment: boolean = false;
    commentDistance: number = 5;
    theme: string = 'perfect';
    loadIgnore: boolean = true;
    constructor() {
        if (config) {
            return config;
        }
        const configuration: WorkspaceConfiguration = workspace.getConfiguration();
        this.withComment = !!configuration.get('ProjectTree.withComment');
        this.commentDistance =
            configuration.get('ProjectTree.commentDistance') || 1;
        this.theme = configuration.get('ProjectTree.theme') || this.theme;
        this.loadIgnore =
            configuration.get('ProjectTree.loadIgnore') || this.loadIgnore;
        return (config = this);
    }
}
