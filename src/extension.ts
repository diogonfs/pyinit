// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { debug } from 'util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pyinit" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.generateInit', async (fileObj) => {
		// The code you place here will be executed every time your command is executed
		let activeEditor = vscode.window.activeTextEditor;
		let counter = 0
		if(!fileObj) {
			await vscode.commands.executeCommand('copyFilePath')
			fileObj = await vscode.env.clipboard.readText()
		}

		if (fileObj !== null && fileObj !== undefined) {
			let dirname = !(typeof fileObj === 'string') ? fileObj.path : fileObj 
			let dirs = fs.readdirSync(dirname).filter((file) => {
				return fs.statSync(dirname +'/'+ file).isDirectory();
			}).map((file) => {
				return dirname + '/' + file
			});
			dirs.push(dirname)

			dirs.forEach((dir_path) => {
				if (!fs.existsSync(path.join(dir_path, "__init__.py"))) {
					counter++
					fs.writeFileSync(path.join(dir_path, '__init__.py'), "")
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