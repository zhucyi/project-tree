import { ExtensionContext, commands, window, workspace } from 'vscode';
// import * as vscode from 'vscode';
import Entry from './index';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('extension.ProjectTree', () => {
            new Entry().action();
        })
    );
}

export function deactivate() {}
