import { readdirSync, statSync, Stats } from 'fs';
import { resolve } from 'path';
import { LevInfo } from './type';
const ignoreList: string[] = ['node_modules', 'hooks', '.git'];
let levInfos: LevInfo[] = [];
/**
 * 遍历文件夹下所有文件文件夹
 * @param ancestor 父级路径
 * @param pathName 当前层级名
 * @param level 当前层级数
 * @param callback 每一层的回调
 */
export function traverse(
    ancestor: string,
    pathName: string = '',
    level: number = 0,
    callback: Function = function() {}
) {
    const acPath: string = resolve(ancestor, pathName);
    levInfos.push({
        level,
        ancestor,
        pathName
    });
    callback(ancestor, pathName, level);
    const files: string[] = readdirSync(acPath);
    files.forEach((item: string) => {
        const fileStat: Stats = statSync(resolve(acPath, item));
        if (fileStat.isDirectory() && !~ignoreList.indexOf(item)) {
            traverse(acPath, item, level + 1, callback);
        } else {
            levInfos.push({
                level: level + 1,
                ancestor: acPath,
                pathName: item
            });
            callback(acPath, item, level + 1);
        }
    });
    if (level === 0) {
        return levInfos;
    }
}
