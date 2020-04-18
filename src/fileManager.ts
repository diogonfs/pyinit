import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export async function getValidResource (resource: any) {
    if (!resource) {
        resource = await getHighlightedResource();
    }
    return resource;
}

export async function getHighlightedResource () {
    await vscode.commands.executeCommand('copyFilePath');
    return await vscode.env.clipboard.readText();
}

// Given a dirname, gets a list of subdirectories recursively
export function traverseDir (dirname: any, dirList: Array<any>) {
    fs.readdirSync(dirname).forEach(file => {
        let fullPath = path.join(dirname, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            dirList.push(fullPath);
            traverseDir(fullPath, dirList);
       }  
    });
}

export function generateInits (dirList: Array<any>) {
    let counter = 0;

    dirList.forEach((dir_path) => {
        if (!fs.existsSync(path.join(dir_path, "__init__.py"))) {
            counter++;
            fs.writeFileSync(path.join(dir_path, '__init__.py'), "");
        }
    })

    return counter;
}

