import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { getChangedFiles } from './lib/git.mjs';
import { createStructuredResponse } from './lib/openai.mjs';

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['score', 'summary', 'strengths', 'issues', 'filesToFix'],
  properties: {
    score: {
      type: 'integer',
      minimum: 0,
      maximum: 10
    },
    summary: {
      type: 'string'
    },
    strengths: {
      type: 'array',
      items: { type: 'string' },
      maxItems: 5
    },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['path', 'severity', 'title', 'detail'],
        properties: {
          path: { type: 'string' },
          severity: {
            type: 'string',
            enum: ['low', 'medium', 'high']
          },
          title: { type: 'string' },
          detail: { type: 'string' }
        }
      },
      maxItems: 10
    },
    filesToFix: {
      type: 'array',
      items: { type: 'string' },
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

async function readChangedFileContent(filePaths) {
  const entries = [];

  for (const filePath of filePaths.slice(0, 8)) {
    const content = await readFile(filePath, 'utf8');
    entries.push({
      path: filePath,
      content: content.slice(0, 12000)
    });
  }

  return entries;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseSha = args.base;
  const headSha = args.head;
  const outputPath = args.out ?? path.join('artifacts', 'review-result.json');

  if (!baseSha || !headSha) {
    throw new Error('Expected --base <sha> and --head <sha>.');
  }

  const changedFiles = await getChangedFiles(baseSha, headSha);

  if (changedFiles.length === 0) {
    const emptyReview = {
      score: 10,
      summary: 'No application files changed.',
      strengths: ['No reviewable source changes were detected.'],
      issues: [],
      filesToFix: []
    };

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(emptyReview, null, 2)}\n`);
    console.log(JSON.stringify(emptyReview));
    return;
  }

  const changedFileContents = await readChangedFileContent(changedFiles);
  const review = await createStructuredResponse({
    model: process.env.OPENAI_REVIEW_MODEL ?? 'gpt-4.1-mini',
    schemaName: 'review_result',
    schema: REVIEW_SCHEMA,
    systemPrompt: [
      'You are a strict pull request reviewer.',
      'Score the patch from 0 to 10.',
      'A score of 8 means the code is solid enough to merge for a small production change.',
      'Consider correctness, edge cases, readability, test coverage, and safety.',
      'Do not reward style-only changes if correctness is weak.',
      'Only mention issues that are grounded in the provided files.'
    ].join(' '),
    userPrompt: JSON.stringify(
      {
        rubric: {
          correctness: 4,
          tests: 2,
          readability: 2,
          safety: 2
        },
        changedFiles: changedFileContents
      },
      null,
      2
    )
  });

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(review, null, 2)}\n`);
  console.log(JSON.stringify(review));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
