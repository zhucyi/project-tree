"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const ignoreList = ['node_modules', 'hooks', '.git'];
let levInfos = [];
/**
 * 遍历文件夹下所有文件文件夹
 * @param ancestor 父级路径
 * @param pathName 当前层级名
 * @param level 当前层级数
 * @param callback 每一层的回调
 */
function traverse(ancestor, pathName = '', level = 0, callback = function () { }) {
    const acPath = path_1.resolve(ancestor, pathName);
    levInfos.push({
        level,
        ancestor,
        pathName
    });
    callback(ancestor, pathName, level);
    const files = fs_1.readdirSync(acPath);
    files.forEach((item) => {
        const fileStat = fs_1.statSync(path_1.resolve(acPath, item));
        if (fileStat.isDirectory() && !~ignoreList.indexOf(item)) {
            traverse(acPath, item, level + 1, callback);
        }
        else {
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
exports.traverse = traverse;
//# sourceMappingURL=traverse.js.map