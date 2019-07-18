import { ExtensionContext, commands, workspace } from 'vscode';
// import * as vscode from 'vscode';
import Entry from './index';
import Config from './config';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('extension.ProjectTree', () => {
            new Entry().action();
        })
    );
    workspace.onDidChangeConfiguration(() => {
        new Config().ensureConfig();
    });
}

export function deactivate() {}
