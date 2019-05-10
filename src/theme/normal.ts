import { LevInfo } from '../type';
export default function(
    levInfos: LevInfo[]
): {
    maxLen: number;
    lines: any;
} {
    let maxLen: number = 0;

    const lines = levInfos.map(({ pathName, level }: LevInfo) => {
        let line: string = '';
        line += new Array(level).join('| ');
        line += level === 0 ? '' : '|-';
        const lineName = line + pathName;
        maxLen = lineName.length > maxLen ? lineName.length : maxLen;
        return lineName;
    });

    return { maxLen, lines };
}
