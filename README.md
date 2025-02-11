# project-tree
English | [简体中文](./README_CN.md)

## Features
Install the plugin, press `Ctrl+Shift+P` and enter `Project Tree` to activate the plugin.
It will generate a tree structure of the project in the `README.md` file.

## Extension Settings
| Name                        | Default Value | Description                                                                  |
| --------------------------- | ------------- | ---------------------------------------------------------------------------- |
| ProjectTree.theme           | 'perfect'     | Set the tree's appearance                                                    |
| ProjectTree.withComment     | false         | Set whether comments can be added at the end of the line                     |
| ProjectTree.commentDistance | 5             | Set the distance between the comment and the longest title, minimum is 1     |
| ProjectTree.loadIgnore      | true          | Set whether to ignore files specified in .gitignore                          |
| ProjectTree.ignoreFolders   | ['node_modules', '.git', '.vscode'] | List of folders to ignore                                                    |
| ProjectTree.distFileName    | 'README.md'   | The target file for the output                                               |


## example
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