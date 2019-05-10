import * as vscode from 'vscode';
import Entry from './index';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        'extension.ProjectTree',
        () => {
            new Entry(vscode).action();
            vscode.window.showInformationMessage(
                'Your README.md has been modified!'
            );
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
