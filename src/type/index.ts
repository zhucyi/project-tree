export interface LevInfo {
    level: number; // 层级
    ancestor: string; // 祖先路径
    pathName: string; // 本层名
    lasStatus: number[]; // 节点自身及其全部上级节点的层级末尾状态 1尾节点
}

export class File {
    private ancestor!: string;
    private pathName!: string;
    private level!: number;
    constructor(ancestor: string, pathName: string, level: number) {
        this.ancestor = ancestor;
        this.pathName = pathName;
        this.level = level;
    }
}

export class Folder {
    private ancestor: string;
    private pathName: string;
    private level: number;
    private children: (Folder | File)[];
    constructor(
        ancestor: string = '',
        pathName: string = '',
        level: number = 0,
        children: (Folder | File)[] = []
    ) {
        this.ancestor = ancestor;
        this.pathName = pathName;
        this.level = level;
        this.children = children;
    }
    addChild(child: Folder | File) {
        this.children.push(child);
    }
}
