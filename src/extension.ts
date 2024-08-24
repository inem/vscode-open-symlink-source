import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "showSymlinkSource" is now active');

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBarItem);

    function updateStatusBar() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            statusBarItem.hide();
            return;
        }

        const filePath = editor.document.fileName;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);

        fs.lstat(filePath, (err, stats) => {
            if (err) {
                console.error(`Error checking file: ${err.message}`);
                statusBarItem.hide();
                return;
            }

            if (stats.isSymbolicLink()) {
                fs.realpath(filePath, (err, resolvedPath) => {
                    if (err) {
                        statusBarItem.text = `$(error) ${err.message}`;
                    } else {
                        let displayPath = resolvedPath;
                        if (workspaceFolder) {
                            displayPath = path.relative(workspaceFolder.uri.fsPath, resolvedPath);
                            // If the path is not within the workspace, it will start with '..'
                            if (!displayPath.startsWith('..')) {
                                displayPath = './' + displayPath;
                            }
                        }
                        statusBarItem.text = `$(link) ${displayPath}`;
                    }
                    statusBarItem.tooltip = 'Path to the symlink source file';
                    statusBarItem.show();
                });
            } else {
                statusBarItem.hide();
            }
        });
    }

    // Update status bar when extension is activated
    updateStatusBar();

    // Update status bar when active editor changes
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBar));

    // Update status bar when document is saved
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(() => {
        if (vscode.window.activeTextEditor) {
            updateStatusBar();
        }
    }));
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}