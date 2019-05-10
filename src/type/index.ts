export interface LevInfo {
    level: number; // 层级
    ancestor: string; // 祖先路径
    pathName: string; // 本层名
    lasStatus: number[]; // 节点自身及其全部上级节点的层级末尾状态 1尾节点
}
