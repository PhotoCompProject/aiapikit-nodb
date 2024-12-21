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

async function deployFTP() {
    const client = new Client();
    client.ftp.verbose = true;

    try {
        console.log('📦 Starting FTP deployment...');

        // Connect to the FTP server
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            port: parseInt(process.env.FTP_PORT),
            secure: false
        });

        console.log('✔️ Connected to FTP server');

        // Set binary transfer mode
        await client.send("TYPE I");

        // Navigate to the remote directory
        await client.cd(process.env.FTP_REMOTE_PATH);
        console.log('✔️ Changed to remote directory:', process.env.FTP_REMOTE_PATH);

        // Upload the dist directory
        const distPath = path.join(rootDir, 'dist');
        if (!fs.existsSync(distPath)) {
            throw new Error('dist directory does not exist. Run npm run build first.');
        }

        console.log('📂 Uploading files from dist directory...');
        await client.uploadFromDir(distPath);

        console.log('✅ Successfully deployed to FTP server');
    } catch (err) {
        console.error('❌ Error deploying to FTP server:', err.message);
        process.exit(1);
    } finally {
        client.close();
    }
}

deployFTP();
