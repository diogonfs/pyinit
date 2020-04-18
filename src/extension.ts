// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as fileManager from './fileManager';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "pyinit" is now active!');

	let disposable = vscode.commands.registerCommand('extension.generateInit', async (fileObj) => {
		
		fileObj = await fileManager.getValidResource(fileObj);
		if (!!fileObj) {
			let dirname = !(typeof fileObj === 'string') ? fileObj.path : fileObj;
			if (fs.lstatSync(dirname).isDirectory()) {
				let dirs: any[] = [];
				fileManager.traverseDir(dirname, dirs);
				dirs.push(dirname);

				const createdFiles = fileManager.generateInits(dirs);
				vscode.window.showInformationMessage(`Pyinit: Generated ${createdFiles} __init__.py file(s)`);
			}			
		}
		else {
			vscode.window.showErrorMessage("Pyinit: You must use it in a directory.");
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
