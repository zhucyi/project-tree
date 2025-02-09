# project-tree
简体中文 | [English](./README.md)

## 功能
安装插件后，按 `Ctrl+Shift+P` 并输入 `Project Tree` 以启动插件。
插件会在 `README.md` 文件中生成项目的树结构。

## 插件设置
| 名称                        | 默认值       | 描述                                                                 |
| --------------------------- | ------------ | -------------------------------------------------------------------- |
| ProjectTree.theme           | 'perfect'    | 设置树的外观                                                        |
| ProjectTree.withComment     | false        | 设置是否可以在行末添加注释                                          |
| ProjectTree.commentDistance | 5            | 设置注释与最长标题之间的距离，最小值为 1                             |
| ProjectTree.loadIgnore      | true         | 设置是否可以忽略 `.gitignore` 文件中包含的文件                       |
| ProjectTree.ignoreFolders   | ['node_modules', '.git', '.vscode'] | 需要忽略的文件夹列表                                                |
| ProjectTree.distFileName    | 'README.md'  | 树结构所在的文件，默认是项目根目录下的 `README.md` 文件              |

## 示例
```
project-tree
├─ .git
├─ .gitignore
├─ .vscode
│  ├─ extensions.json
│  ├─ launch.json
│  ├─ settings.json
│  └─ tasks.json
├─ .vscodeignore
├─ CHANGELOG.md
├─ dist
│  ├─ extension.js
│  └─ extension.js.map
├─ images
│  └─ tree-icon.jpg
├─ node_modules
├─ out
│  ├─ extension.js
│  ├─ extension.js.map
│  ├─ index.js
│  ├─ index.js.map
│  ├─ operate.js
│  ├─ operate.js.map
│  ├─ test
│  │  ├─ extension.test.js
│  │  ├─ extension.test.js.map
│  │  ├─ index.js
│  │  └─ index.js.map
│  ├─ traverse.js
│  ├─ traverse.js.map
│  └─ type
│     ├─ index.js
│     └─ index.js.map
├─ package-lock.json
├─ package.json
├─ src
│  ├─ config.ts
│  ├─ extension.ts
│  ├─ ignore
│  │  └─ index.ts
│  ├─ ignore.ts
│  ├─ index.ts
│  ├─ test
│  │  ├─ extension.test.ts
│  │  └─ index.ts
│  ├─ theme
│  │  ├─ index.ts
│  │  ├─ normal.ts
│  │  └─ perfect.ts
│  ├─ traverse.ts
│  ├─ type
│  │  └─ index.ts
│  └─ utils.ts
├─ tsconfig.json
├─ tslint.json
└─ webpack.config.js         

```

**Enjoy!**