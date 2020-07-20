// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "pyinit" is now active!');

	let disposable = vscode.commands.registerCommand('extension.generateInit', async (fileObj) => {

		let counter = 0;
		if(!fileObj) {
			await vscode.commands.executeCommand('copyFilePath');
			fileObj = await vscode.env.clipboard.readText();
		}

		if (fileObj !== null && fileObj !== undefined) {
			const dirname = typeof fileObj === 'string'
				? fileObj
				: fileObj.fsPath || fileObj.path;
			let dirs = [];

			function traverseDir(dirname: any) {
				fs.readdirSync(dirname).forEach(file => {
				  	let fullPath = path.join(dirname, file);
				  	if (fs.lstatSync(fullPath).isDirectory()) {
						dirs.push(fullPath);
						traverseDir(fullPath);
				   }
				});
			}

			traverseDir(dirname)
			dirs.push(dirname)

			dirs.forEach((dir_path) => {
				if (!fs.existsSync(path.join(dir_path, "__init__.py"))) {
					counter++;
					fs.writeFileSync(path.join(dir_path, '__init__.py'), "");
				}
			})

			vscode.window.showInformationMessage(`Pyinit: Generated ${counter} __init__.py file(s)`);
		}
		else {
			vscode.window.showErrorMessage("Pyinit: You must open a directory.");
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}