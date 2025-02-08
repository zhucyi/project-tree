import * as vscode from 'vscode';
import Entry from './index';
import Config from './config';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'project-tree-v1.helloWorld',
    () => {
      new Entry().action();
      vscode.window.showInformationMessage('Hello World from project-tree-v1!');
      vscode.workspace.onDidChangeConfiguration(() => {
        new Config().ensureConfig();
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
