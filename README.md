# project-tree
## Features
Install the plugin, press ctrl+shift+p and enter Project Tree to enter.
Generate a tree structure of the project in README.md.

## Extension Settings

settings:
* `ProjectTree.theme`: Set tree's outlook
* `ProjectTree.withComment`:Set whether you can add comments at the end of the line.
* `ProjectTree.commentDistance`:set the distance between the comment and the longest title,the minimum is 1

-----------------------------------------------------------------------------------------------------------

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