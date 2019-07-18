import { readdirSync, statSync, Stats } from 'fs';
import { resolve } from 'path';
import { LevInfo, File, Folder } from './type';
import { clone } from './utils';
import { verify, produceRules } from './ignore/index';
let levInfos: LevInfo[] = [];

/**
 * 遍历文件夹下所有文件文件夹,构建文件树
 * @param ancestor 父级路径
 * @param pathName 当前层级名
 * @param level 当前层级数
 * @param folder 根
 * @param callback 每一层的回调
 */
export function traverseFolder(
    ancestor: string,
    pathName: string = '',
    level: number = 0,
    folder: Folder = new Folder(),
    callback: Function = function() {}
) {
    const acPath: string = resolve(ancestor, pathName);
    if (level === 0) {
        folder = new Folder(ancestor, pathName, level);
        produceRules(acPath); //解析gitignore规则
    }
    callback(ancestor, pathName, level);
    const files: string[] = readdirSync(acPath);
    files.forEach((item: string) => {
        const curLevel = level + 1;
        const fileStat: Stats = statSync(resolve(acPath, item));
        const isDirectory: boolean = fileStat.isDirectory();
        const isBlocked: boolean = verify(acPath, item, isDirectory);
        if (isBlocked) {
            return;
        }
        if (isDirectory) {
            const childFolder: Folder = new Folder(acPath, item, curLevel);
            folder.addChild(childFolder);
            traverseFolder(acPath, item, curLevel, childFolder, callback);
        } else {
            folder.addChild(new File(acPath, item, curLevel));
            callback(acPath, item, curLevel);
        }
    });
    return folder;
}

/**
 * 遍历文件树
 * @param folder 文件树节点
 * @param callback 每一层的回调
 * @param lasStatus 每层状态点
 */
export function traverse(
    folder: Folder,
    callback: Function = function() {},
    lasStatus: number[] = []
) {
    const ancestor = folder.getAncestor(),
        pathName = folder.getPathName(),
        level = folder.getLevel();
    if (folder.getLevel() === 0) {
        lasStatus = [0];
        levInfos = [
            {
                ancestor,
                pathName,
                level,
                lasStatus
            }
        ];
    }
    callback(ancestor, pathName, level);
    const files: Array<File | Folder> = folder.getChildren();
    files.forEach((item: File | Folder, index: number) => {
        const curLevel = item.getLevel();
        lasStatus = clone(lasStatus);
        lasStatus[curLevel] = Number(index === files.length - 1);
        levInfos.push({
            ancestor: item.getAncestor(),
            pathName: item.getPathName(),
            level: curLevel,
            lasStatus
        });
        if (item instanceof Folder) {
            traverse(<Folder>item, callback, lasStatus);
        } else {
            callback(item.getAncestor(), item.getPathName(), curLevel);
        }
    });
    if (level === 0) {
        return levInfos;
    }
}
