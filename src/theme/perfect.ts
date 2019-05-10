import { LevInfo } from '../type';

const firMid: string = '├';
const las: string = '└';
const vertical: string = '│';
const horizontal: string = '─';
export default function(
    levInfos: LevInfo[]
): {
    maxLen: number;
    lines: any;
} {
    let maxLen: number = 0;

    const lines = levInfos.map(({ pathName, level, lasStatus }: LevInfo) => {
        let lasIcon: string = lasStatus.slice(-1)[0] ? las : firMid;
        let line: string = '';
        line += lasStatus
            .slice(1, lasStatus.length - 1)
            .map((item: number, index: number) => {
                // 第一个肯定是 | 第二个按照层级来往后缩一个为了对齐箭头个字符
                // 之后的根据 01标记来确定此处要不要显示 |
                if (index === 0) {
                    return `${vertical} `;
                } else if (level > 1) {
                    return item ? '   ' : ` ${vertical} `;
                }
                return item ? '  ' : `${vertical} `;
            })
            .join('');
        if (level > 1) {
            lasIcon = ' ' + lasIcon;
        }
        line += level === 0 ? '' : lasIcon + horizontal;
        const lineName = `${line} ${pathName}`;
        maxLen = lineName.length > maxLen ? lineName.length : maxLen;
        return lineName;
    });

    return { maxLen, lines };
}
