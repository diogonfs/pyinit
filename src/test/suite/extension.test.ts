import * as assert from 'assert';
import * as path from 'path'
import * as fs from 'fs';
import { before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

export const testFolderLocation = '/../../../src/test/examples/'

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
		fs.unlinkSync(path.join(__dirname + testFolderLocation, "__init__.py"))
	});
	
	test('Test Create Init', async () => {
		const extension = vscode.extensions.getExtension("DiogoNolasco.pyinit");
		if (extension && !extension.isActive) {
			await extension.activate()
		}

		await vscode.commands.executeCommand('extension.generateInit', path.join(__dirname + testFolderLocation))
		sleep(500)
		const initFile = await fs.existsSync(path.join(__dirname + testFolderLocation, "__init__.py"))

		assert.strictEqual(initFile, true)

	});
});

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }
  