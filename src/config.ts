import { WorkspaceConfiguration, workspace } from 'vscode';

let config!: Config;
export default class Config {
  // 是否显示注释
  withComment: boolean = false;
  // 注释距离
  commentDistance: number = 5;
  // 主题
  theme: string = 'perfect';
  // 是否加载gitignore
  loadIgnore: boolean = true;
  // 文件夹忽略列表
  ignoreFolders: string[] = [];
  // 输出的目标文件
  distFileName: string = 'README.md';

  constructor() {
    if (config) {
      return config;
    }
    this.ensureConfig();
    return (config = this);
  }

  ensureConfig() {
    const configuration: WorkspaceConfiguration = workspace.getConfiguration();
    this.withComment = !!configuration.get('ProjectTree.withComment');
    this.commentDistance =
      configuration.get('ProjectTree.commentDistance') || 1;
    this.theme = configuration.get('ProjectTree.theme') || this.theme;
    this.loadIgnore = !!configuration.get('ProjectTree.loadIgnore');
    this.ignoreFolders =
      configuration.get<string[]>('ProjectTree.ignoreFolders') || [];
    this.distFileName =
      configuration.get('ProjectTree.distFileName') || this.distFileName;
  }
}
