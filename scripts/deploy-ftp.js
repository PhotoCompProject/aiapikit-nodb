import FtpDeploy from 'ftp-deploy';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT || 21,
  localRoot: path.join(__dirname, '../dist'),
  remoteRoot: process.env.FTP_REMOTE_ROOT || '/',
  include: ['*', '**/*'],
  exclude: [
    '.git/**',
    '.github/**',
    'node_modules/**',
    'scripts/**',
    '.env',
    '.env.example',
    'README.md'
  ],
  deleteRemote: false,
  forcePasv: true
};

ftpDeploy
  .deploy(config)
  .then(res => {
    console.log('✅ Deploy finished:', res);
  })
  .catch(err => {
    console.error('❌ Deploy failed:', err);
    process.exit(1);
  });
