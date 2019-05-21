import { readFileSync } from 'fs';
import { resolve } from 'path';

let ignoreList: string[] = [];
let ignoreRegs: RegExp[] = [];
const extraList: string[] = ['node_modules', 'hooks', '.git'];
/**
 * gitignore生成ignore规则
 * @param igPath gitignore路径
 */
export function produceRules(igPath: string): void {
    if (!/\.gitignore$/.test(igPath)) {
        igPath = resolve(igPath, '.gitignore');
    }
    try {
        const fileStr: string = readFileSync(igPath, 'utf8');
        ignoreList = fileStr
            .split(/\r?\n/)
            .map((item: string) => {
                const itm: string = item.trim();
                if (item[0] === '#') {
                    return '';
                }
                return itm;
            })
            .filter((item: string) => {
                return !!item;
            });
        console.log(ignoreList);
    } catch (e) {
        ignoreList = ignoreList.concat(extraList);
        console.log(e);
    }
    tran2Reg();
}

function tran2Reg(): void {
    ignoreRegs = ignoreList.map((item: string) => {
        let itm: string = item;
        itm = itm.replace('.', '.');
        itm = itm.replace('*', '*.');
        return new RegExp(itm);
    });
}

/**
 * ensure wheather it can be explored
 * @param acPath file's ancestor's path
 * @param name file's name
 */
export function verify(acPath: string, name: string): boolean {
    return !~ignoreList.indexOf(name);
}
