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
        let line: string = '';
        line += lasStatus
            .slice(1, lasStatus.length - 1)
            .map((item: number) => {
                return item ? '   ' : `${vertical}  `;
            })
            .join('');
        let lastIcon: string = '';
        if (level > 0) {
            lastIcon =
                (lasStatus.slice(-1)[0] ? las : firMid) + horizontal + ' ';
        }
        line += lastIcon;
        const lineName = `${line}${pathName}`;
        maxLen = lineName.length > maxLen ? lineName.length : maxLen;
        return lineName;
    });

    return { maxLen, lines };
}
