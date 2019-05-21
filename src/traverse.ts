import { readdirSync, statSync, Stats } from 'fs';
import { resolve } from 'path';
import { LevInfo } from './type';
import { clone } from './utils';
import { verify, produceRules } from './ignore/index';
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
    callback: Function = function() {},
    lasStatus: number[] = []
) {
    const acPath: string = resolve(ancestor, pathName);
    if (level === 0) {
        lasStatus = [0];
        levInfos = [
            {
                ancestor,
                pathName,
                level,
                lasStatus
            }
        ];
        produceRules(acPath); //解析gitignore规则
    }
    callback(ancestor, pathName, level);
    const files: string[] = readdirSync(acPath);
    files.forEach((item: string, index: number) => {
        const curLevel = level + 1;
        lasStatus = clone(lasStatus);
        lasStatus[curLevel] = Number(index === files.length - 1);
        levInfos.push({
            ancestor: acPath,
            pathName: item,
            level: curLevel,
            lasStatus
        });
        const fileStat: Stats = statSync(resolve(acPath, item));
        if (fileStat.isDirectory() && verify(acPath, item)) {
            traverse(acPath, item, curLevel, callback, lasStatus);
        } else {
            callback(acPath, item, level + 1);
        }
    });
    if (level === 0) {
        return levInfos;
    }
}
