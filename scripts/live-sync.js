import chokidar from 'chokidar';
import { Client } from 'basic-ftp';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// FTP Client pool
let ftpClient = null;

async function getFTPClient() {
    if (ftpClient) {
        try {
            await ftpClient.pwd();
            return ftpClient;
        } catch (error) {
            ftpClient = null;
        }
    }

    const client = new Client();
    client.ftp.verbose = true;
    
    await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        port: parseInt(process.env.FTP_PORT),
        secure: false
    });

    await client.cd(process.env.FTP_REMOTE_PATH);
    ftpClient = client;
    return client;
}

async function uploadFile(localPath) {
    try {
        const client = await getFTPClient();
        const relativePath = path.relative(distDir, localPath);
        const remoteDir = path.dirname(relativePath);

        if (remoteDir !== '.') {
            // Ensure remote directory exists
            const dirs = remoteDir.split(path.sep);
            let currentDir = '';
            for (const dir of dirs) {
                currentDir = path.join(currentDir, dir);
                try {
                    await client.mkdir(currentDir);
                } catch (error) {
                    // Directory might already exist
                }
            }
            await client.cd(remoteDir);
        }

        console.log(`📤 Uploading: ${relativePath}`);
        await client.uploadFrom(localPath, path.basename(localPath));
        console.log(`✅ Uploaded: ${relativePath}`);

        // Return to root directory
        if (remoteDir !== '.') {
            await client.cd(process.env.FTP_REMOTE_PATH);
        }
    } catch (error) {
        console.error(`❌ Error uploading ${localPath}:`, error.message);
    }
}

async function deleteFile(localPath) {
    try {
        const client = await getFTPClient();
        const relativePath = path.relative(distDir, localPath);
        console.log(`🗑️  Deleting: ${relativePath}`);
        await client.remove(relativePath);
        console.log(`✅ Deleted: ${relativePath}`);
    } catch (error) {
        console.error(`❌ Error deleting ${localPath}:`, error.message);
    }
}

async function startSync() {
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
        console.error('❌ dist directory does not exist. Run npm run build first.');
        process.exit(1);
    }

    console.log('👀 Watching for file changes...');

    const watcher = chokidar.watch(distDir, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true
    });

    watcher
        .on('add', path => uploadFile(path))
        .on('change', path => uploadFile(path))
        .on('unlink', path => deleteFile(path));

    // Handle cleanup
    process.on('SIGINT', async () => {
        console.log('\n🛑 Stopping file watcher...');
        await watcher.close();
        if (ftpClient) {
            await ftpClient.close();
        }
        process.exit();
    });
}

// Start the sync process
console.log('🚀 Starting live FTP sync...');
startSync().catch(error => {
    console.error('❌ Error starting sync:', error);
    process.exit(1);
});
