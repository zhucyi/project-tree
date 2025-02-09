import * as vscode from 'vscode';
import Entry from './index';
import Config from './config';

export function activate(context: vscode.ExtensionContext) {
  const config = new Config();
  const entry = new Entry();

  vscode.workspace.onDidChangeConfiguration(() => config.ensureConfig());

  const disposable = vscode.commands.registerCommand(
    'project-tree.projectTree',
    () => entry.action()
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
