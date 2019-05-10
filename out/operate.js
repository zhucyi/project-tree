"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function operate(root) {
    fs_1.appendFileSync(path_1.resolve(root, 'README.md'), 'test');
}
exports.operate = operate;
//# sourceMappingURL=operate.js.map