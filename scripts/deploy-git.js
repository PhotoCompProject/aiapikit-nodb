import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';

const execAsync = promisify(exec);

async function deploy() {
  try {
    // Build the project
    console.log(chalk.blue('📦 Building project...'));
    await execAsync('npm run build');
    console.log(chalk.green('✅ Build completed'));

    // Add all changes
    console.log(chalk.blue('📝 Adding changes...'));
    await execAsync('git add .');
    console.log(chalk.green('✅ Changes added'));

    // Get the current branch name
    const { stdout: branchName } = await execAsync('git rev-parse --abbrev-ref HEAD');
    console.log(chalk.blue(`🌿 Current branch: ${branchName.trim()}`));

    // Get staged files
    const { stdout: stagedFiles } = await execAsync('git diff --cached --name-only');
    if (!stagedFiles) {
      console.log(chalk.yellow('⚠️ No changes to commit'));
      return;
    }

    // Commit changes with timestamp
    const timestamp = new Date().toISOString();
    console.log(chalk.blue('💾 Committing changes...'));
    await execAsync(`git commit -m "Deploy: ${timestamp}"`);
    console.log(chalk.green('✅ Changes committed'));

    // Push to remote
    console.log(chalk.blue(`🚀 Pushing to ${branchName.trim()}...`));
    await execAsync(`git push origin ${branchName.trim()}`);
    console.log(chalk.green('✅ Successfully pushed to remote'));

    console.log(chalk.green.bold('\n🎉 Deployment completed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Deployment failed:'), error.message);
    process.exit(1);
  }
}

deploy();
