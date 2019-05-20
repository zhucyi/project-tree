import { readFileSync } from 'fs';

function produceRules(igPath: string) {
    const fileStr: string = readFileSync(igPath, 'utf8');
    const lines: string[] = fileStr.split(/\r?\n/).map((item: string) => {
        const itm: string = item.trim();
        if (item[0] === '#') {
            return '';
        }
        return itm;
    });
}

function filter() {}
