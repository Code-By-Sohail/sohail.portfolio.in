import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');
const tailwindConfigPath = path.join(__dirname, 'tailwind.config.js');

const filesToProcess = [];

function getAllFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath);
        } else {
            if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
                filesToProcess.push(fullPath);
            }
        }
    }
}

getAllFiles(directoryPath);
filesToProcess.push(tailwindConfigPath);

for (const filePath of filesToProcess) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
        .replace(/neon-purple/g, 'neon-blue')
        .replace(/purple/gi, 'blue')
        .replace(/#b44fff/g, '#0088ff')
        .replace(/180,79,255/g, '0,136,255')
        .replace(/180,\s*79,\s*255/g, '0,136,255');
        
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Updated: ' + filePath);
    }
}
console.log('Done');
