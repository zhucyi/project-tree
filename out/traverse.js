"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseFolder = traverseFolder;
exports.traverse = traverse;
const fs_1 = require("fs");
const path_1 = require("path");
const type_1 = require("./type");
const utils_1 = require("./utils");
const index_1 = require("./ignore/index");
let levInfos = [];
/**
 * 遍历文件夹下所有文件文件夹,构建文件树
 * @param ancestor 父级路径
 * @param pathName 当前层级名
 * @param level 当前层级数
 * @param folder 根
 * @param callback 每一层的回调
 */
function traverseFolder(ancestor, pathName = '', level = 0, folder = new type_1.Folder(), callback = function () { }) {
    const acPath = (0, path_1.resolve)(ancestor, pathName);
    if (level === 0) {
        folder = new type_1.Folder(ancestor, pathName, level);
        (0, index_1.produceRules)(acPath); //解析gitignore规则
    }
    callback(ancestor, pathName, level);
    const files = (0, fs_1.readdirSync)(acPath);
    files.forEach((item) => {
        const curLevel = level + 1;
        const fileStat = (0, fs_1.statSync)((0, path_1.resolve)(acPath, item));
        const isDirectory = fileStat.isDirectory();
        const isBlocked = (0, index_1.verify)(acPath, item, isDirectory);
        if (isBlocked) {
            return;
        }
        if (isDirectory) {
            const childFolder = new type_1.Folder(acPath, item, curLevel);
            folder.addChild(childFolder);
            traverseFolder(acPath, item, curLevel, childFolder, callback);
        }
        else {
            folder.addChild(new type_1.File(acPath, item, curLevel));
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
function traverse(folder, callback = function () { }, lasStatus = []) {
    const ancestor = folder.getAncestor(), pathName = folder.getPathName(), level = folder.getLevel();
    if (folder.getLevel() === 0) {
        lasStatus = [0];
        levInfos = [
            {
                ancestor,
                pathName,
                level,
                lasStatus,
            },
        ];
    }
    callback(ancestor, pathName, level);
    const files = folder.getChildren();
    files.forEach((item, index) => {
        const curLevel = item.getLevel();
        lasStatus = (0, utils_1.clone)(lasStatus);
        lasStatus[curLevel] = Number(index === files.length - 1);
        levInfos.push({
            ancestor: item.getAncestor(),
            pathName: item.getPathName(),
            level: curLevel,
            lasStatus,
        });
        if (item instanceof type_1.Folder) {
            traverse(item, callback, lasStatus);
        }
        else {
            callback(item.getAncestor(), item.getPathName(), curLevel);
        }
    });
    if (level === 0) {
        return levInfos;
    }
}
//# sourceMappingURL=traverse.js.map