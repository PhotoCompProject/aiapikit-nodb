# Deployment System Documentation

This project includes a comprehensive deployment system with both manual deployment and live sync capabilities.

## Setup

1. Copy `.env.example` to `.env` and fill in your credentials:
```env
# FTP Deployment
FTP_HOST=your-ftp-host
FTP_USER=your-username
FTP_PASSWORD=your-password
FTP_PORT=21
FTP_REMOTE_PATH=/

# Git Deployment
GITHUB_TOKEN=your-github-token
GITHUB_REPO=your-repo-name
```

## Available Commands

### Manual Deployment

- `npm run deploy:ftp` - Builds the project and deploys to Bluehost via FTP
- `npm run deploy:git` - Commits and pushes to GitHub
- `npm run deploy` - Runs both FTP and Git deployment in sequence

### Live Development with FTP Sync

- `npm run sync` - Builds and starts FTP sync (watches dist folder for changes)
- `npm run dev:sync` - Runs development server and FTP sync simultaneously

## Features

### FTP Deployment
- Automatic file watching and instant FTP uploads
- Handles file additions, modifications, and deletions
- Maintains FTP connection pool for better performance
- Creates remote directories automatically
- Supports both one-time deployment and continuous sync

### Git Deployment
- Automatic commit messages with timestamps
- Handles branch creation and management
- Includes error handling and retry logic
- Supports force push when needed

## Usage Guide

### Development with Live Sync
1. Run `npm run dev:sync` to start both development server and FTP sync
2. Make changes to your code
3. Changes will be automatically built and synced to the FTP server
4. Press Ctrl+C to stop the development server and sync

### Production Deployment
1. Make your changes to the code
2. Run `npm run deploy` to:
   - Build the project
   - Deploy to Bluehost via FTP
   - Commit and push to GitHub

### Manual Deployment Options
- Use `npm run deploy:ftp` if you only want to deploy to FTP
- Use `npm run deploy:git` if you only want to commit and push to GitHub

## Important Notes

1. Keep your `.env` file secure and never commit it to git
2. Use `.env.example` as a template when setting up on a new machine
3. The live sync watches the `dist` directory, so make sure to run build first
4. Git deployment automatically includes timestamps in commit messages
5. FTP sync will create remote directories if they don't exist

## Troubleshooting

If you encounter issues:

1. FTP Connection Issues:
   - Check your FTP credentials in `.env`
   - Verify the FTP server is accessible
   - Check if the remote path exists and you have permissions

2. Git Deployment Issues:
   - Ensure you have the correct repository URL
   - Check if you have write permissions to the repository
   - Try running git commands manually to verify access

3. Sync Issues:
   - Make sure the dist directory exists (run build first)
   - Check if files are being watched (should see console output)
   - Verify FTP connection and permissions
