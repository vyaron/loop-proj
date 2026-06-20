import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export async function runGit(args, options = {}) {
  const { stdout } = await execFileAsync('git', args, {
    maxBuffer: 1024 * 1024,
    ...options
  });

  return stdout.trim();
}

export async function getChangedFiles(baseSha, headSha) {
  const output = await runGit(['diff', '--name-only', `${baseSha}...${headSha}`]);

  return output
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((filePath) => !filePath.startsWith('.github/'))
    .filter((filePath) => !filePath.startsWith('node_modules/'))
    .filter((filePath) => filePath !== '.loop-state.json');
}
