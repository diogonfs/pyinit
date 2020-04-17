import * as assert from 'assert';
import * as path from 'path'
import * as fs from 'fs';
import { before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as fileManager from '../../fileManager';
import { testFolderLocation } from './extension.test';

suite('FileManager Test Suite', () => {
	before(() => {
        vscode.window.showInformationMessage('Start all tests.');
	});
	
	test('Should return resource if it is a valid resource (active folder)', async () => {
        const resource = path.join(__dirname + testFolderLocation);
        const result = await fileManager.getValidResource(resource);

        assert.strictEqual(resource, result);
    });
    
    test('Should return highlighted folder if there is not a valid resource (active folder)', async () => {
        const resource = path.join(__dirname + testFolderLocation, 'normalFile.py');
        const uri = vscode.Uri.file(resource)
        await vscode.window.showTextDocument(uri);
        const result = await fileManager.getValidResource(null);

        assert.strictEqual(resource, result);
    });
    
    test('Should get highlighted folder resource (active folder)', async () => {
        const resource = path.join(__dirname + testFolderLocation, 'normalFile.py');
        const uri = vscode.Uri.file(resource)
        await vscode.window.showTextDocument(uri);
        const result = await fileManager.getHighlightedResource();

        assert.strictEqual(resource, result);
    });

    test('Should get all subdirectories of a folder', () => {
        const parentDir = path.join(__dirname + "/../");
        let dirList = [1,2];
        fileManager.traverseDir(parentDir, dirList);

        assert.deepEqual(dirList, [1,2, path.join(__dirname)]);
    });

    test('Should be able to generate init files in a folder', () => {
        fs.unlinkSync(path.join(__dirname + testFolderLocation, "__init__.py"))
        const parentDir = path.join(__dirname + testFolderLocation);
        const dirList = [parentDir];
        const result = fileManager.generateInits(dirList);

        assert.strictEqual(result, 1);
    });
    
});
  