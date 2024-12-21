# Deployment Guide

This project includes two deployment methods: FTP and Git. You can use either one or both depending on your needs.

## Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```env
# FTP Deployment Configuration
FTP_HOST=your-ftp-host.com
FTP_USER=your-ftp-username
FTP_PASSWORD=your-ftp-password
FTP_PORT=21
FTP_REMOTE_ROOT=/public_html/your-subdirectory

# Development Configuration
VITE_API_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
```

## Deployment Methods

### 1. FTP Deployment

This method builds your project and uploads it to your FTP server.

```bash
npm run deploy:ftp
```

The script will:
1. Build your project (`npm run build`)
2. Upload the built files to your FTP server
3. Exclude unnecessary files (node_modules, .git, etc.)

### 2. Git Deployment

This method commits and pushes your changes to Git.

```bash
npm run deploy:git
```

The script will:
1. Build your project
2. Add all changes to Git
3. Create a commit with timestamp
4. Push to your current branch

### 3. Combined Deployment

To run both deployment methods in sequence:

```bash
npm run deploy
```

This will:
1. Run FTP deployment
2. Run Git deployment

## Configuration

### FTP Configuration

Update your `.env` file with your FTP credentials:

- `FTP_HOST`: Your FTP server hostname
- `FTP_USER`: Your FTP username
- `FTP_PASSWORD`: Your FTP password
- `FTP_PORT`: FTP port (usually 21)
- `FTP_REMOTE_ROOT`: Remote directory path where files should be uploaded

### Git Configuration

The Git deployment script uses your local Git configuration. Make sure:

1. Git is installed and configured
2. You have the correct remote repository set up
3. You have the necessary permissions to push to the repository

## Troubleshooting

### FTP Deployment Issues

1. Check your FTP credentials in `.env`
2. Verify the FTP server is accessible
3. Check if the remote directory exists and has write permissions
4. Try using passive mode if behind a firewall

### Git Deployment Issues

1. Check if you're on the correct branch
2. Verify your Git remote configuration
3. Ensure you have the latest changes (`git pull`)
4. Check if you have uncommitted changes
