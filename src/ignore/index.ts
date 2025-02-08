import { readFileSync } from 'fs';
import { resolve } from 'path';
import Config from '../config';

let ignoreList: string[] = [];
let ignoreRegs: RegExp[] = [];
let notIgnoreRegs: RegExp[] = [];
const config: Config = new Config();

/**
 * 根据gitignore文件生成ignore规则
 * @param igFilePath gitignore路径
 */
export function produceRules(igFilePath: string): void {
  if (!config.loadIgnore) {
    ignoreList = [];
    ignoreRegs = [];
    notIgnoreRegs = [];
    return;
  }
  if (!/\.gitignore$/.test(igFilePath)) {
    igFilePath = resolve(igFilePath, '.gitignore');
  }
  try {
    const fileStr: string = readFileSync(igFilePath, 'utf8');
    ignoreList = fileStr
      .split(/\r?\n/)
      .map((item: string) => {
        return item.replace(/#.*/, '').trim();
      })
      .filter((item: string) => {
        return !!item;
      });
  } catch (e) {
    ignoreList = [];
    console.log(e);
  }

  ignoreList = ignoreList.concat(config.ignoreFolders);
  tran2Reg();
}

/**
 * 转换ignore规则为正则
 */
function tran2Reg(): void {
  ignoreRegs = [];
  notIgnoreRegs = [];
  ignoreList.forEach((item: string) => {
    let itm = item.replace(/\./g, '\\.');
    itm = itm.replace(/\*+/g, '.*');
    itm = itm.replace(/\//g, '\\\\');
    // itm = itm.replace(/\?/g, '.');
    itm = itm.replace(/\?+/g, (...args) => {
      // \ / : * ? " < > |
      return `(?<=^|[\\\\\/\\:\\*\\?\\"\\<\\>\\|]).{${args[0].length}}`;
    });
    if (!!~item.indexOf('!')) {
      itm = itm.replace(/!(.*)$/, (...args) => {
        return `(?=${args[1]}).{${args[1].length}}$`;
      });
      notIgnoreRegs.push(new RegExp(itm));
    } else {
      ignoreRegs.push(new RegExp(itm));
    }
  });
}

/**
 * ensure wheather it can be explored
 * @param acPath file's ancestor's path
 * @param name file's name
 * @param isDirectory is directory
 * @returns true应该被排除 false不该排除
 */
export function verify(
  acPath: string,
  name: string,
  isDirectory: boolean
): boolean {
  const path: string = `${resolve(acPath, name)}${isDirectory ? '\\' : ''}`;
  const notIgnore: boolean = notIgnoreRegs.some((reg: RegExp) =>
    reg.test(path)
  );
  if (notIgnore) {
    return false;
  }
  const ignore: boolean = ignoreRegs.some((reg: RegExp) => reg.test(path));
  return ignore;
  // return !~ignoreList.indexOf(name);
}
