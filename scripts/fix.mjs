import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { createStructuredResponse } from './lib/openai.mjs';

const FIX_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'updates'],
  properties: {
    summary: {
      type: 'string'
    },
    updates: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['path', 'content', 'reason'],
        properties: {
          path: { type: 'string' },
          content: { type: 'string' },
          reason: { type: 'string' }
        }
      },
      maxItems: 10
    }
  }
};

function parseArgs(argv) {
  const values = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith('--')) {
      continue;
    }

    values[token.slice(2)] = argv[index + 1];
    index += 1;
  }

  return values;
}

function isAllowedPath(filePath) {
  return filePath.startsWith('src/') || filePath.startsWith('test/');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const reviewPath = args.review ?? path.join('artifacts', 'review-result.json');
  const attempt = Number(args.attempt ?? '1');
  const review = JSON.parse(await readFile(reviewPath, 'utf8'));
  const filesToFix = [...new Set(review.filesToFix.filter(isAllowedPath))];
  let previousTestFeedback = null;

  try {
    const loopState = JSON.parse(await readFile('.loop-state.json', 'utf8'));
    previousTestFeedback = loopState.testFeedback ?? null;
  } catch {
    previousTestFeedback = null;
  }

  if (filesToFix.length === 0) {
    console.log('No eligible files to fix.');
    return;
  }

  const filePayload = [];

  for (const filePath of filesToFix) {
    const content = await readFile(filePath, 'utf8');
    filePayload.push({ path: filePath, content });
  }

  const fix = await createStructuredResponse({
    model: process.env.OPENAI_FIX_MODEL ?? 'gpt-4.1-mini',
    schemaName: 'fix_result',
    schema: FIX_SCHEMA,
    systemPrompt: [
      'You are fixing a small JavaScript pull request after code review.',
      'Update only the provided files.',
      'Preserve the project structure and exports.',
      'Do not create new files or move files to different paths.',
      'Keep import paths valid relative to each file location.',
      'Return complete rewritten file contents for each updated file.',
      'Prefer minimal changes that improve correctness, tests, readability, and safety.',
      'If previous test feedback exists, prioritize fixing those failures first.'
    ].join(' '),
    userPrompt: JSON.stringify(
      {
        currentReview: review,
        previousTestFeedback,
        files: filePayload
      },
      null,
      2
    )
  });

  for (const update of fix.updates) {
    if (!isAllowedPath(update.path)) {
      throw new Error(`Refusing to update disallowed path: ${update.path}`);
    }

    if (!filesToFix.includes(update.path)) {
      throw new Error(`Refusing to update file not requested by review: ${update.path}`);
    }

    await writeFile(update.path, update.content.endsWith('\n') ? update.content : `${update.content}\n`);
  }

  const nextState = {
    attempts: attempt,
    lastScore: review.score,
    updatedAt: new Date().toISOString(),
    summary: fix.summary
  };

  await writeFile('.loop-state.json', `${JSON.stringify(nextState, null, 2)}\n`);
  console.log(JSON.stringify(nextState));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
