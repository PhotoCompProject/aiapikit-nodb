import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const execAsync = promisify(exec);

async function gitDeploy() {
    try {
        // Get current date for commit message
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toTimeString().split(' ')[0];
        const commitMessage = `Deployment ${date} ${time}`;

        console.log('📦 Starting Git deployment...');

        // Check if we're in a git repository
        try {
            await execAsync('git rev-parse --is-inside-work-tree');
        } catch (error) {
            console.log('Initializing Git repository...');
            await execAsync('git init');
            await execAsync('git remote add origin https://github.com/msnandhis/aiapikit.git');
        }

        // Add all changes
        await execAsync('git add .');
        console.log('✔️ Added changes to git');

        // Check if there are changes to commit
        const status = await execAsync('git status --porcelain');
        if (!status.stdout) {
            console.log('No changes to commit');
            return;
        }

        // Commit changes
        await execAsync(`git commit -m "${commitMessage}"`);
        console.log('✔️ Committed changes');

        // Check if main branch exists locally
        try {
            await execAsync('git rev-parse --verify main');
        } catch (error) {
            console.log('Creating main branch...');
            await execAsync('git branch -M main');
        }

        // Try to push directly first (for initial push)
        try {
            console.log('Attempting to push to remote...');
            await execAsync('git push -u origin main --force');
            console.log('✅ Successfully pushed to remote repository');
            return;
        } catch (error) {
            console.log('Initial push failed, trying to sync with remote...');
        }

        // If direct push fails, try to sync with remote
        try {
            // Fetch from remote
            await execAsync('git fetch origin');
            
            // Try to rebase
            try {
                await execAsync('git pull origin main --rebase');
            } catch (error) {
                // If pull fails, it might be because the remote branch doesn't exist
                console.log('Remote branch may not exist, proceeding with push');
            }

            // Push changes
            await execAsync('git push -u origin main');
            console.log('✅ Successfully pushed to remote repository');
        } catch (error) {
            throw new Error(`Failed to push to remote: ${error.message}`);
        }

    } catch (error) {
        console.error('❌ Error during Git deployment:', error.message);
        process.exit(1);
    }
}

gitDeploy();
