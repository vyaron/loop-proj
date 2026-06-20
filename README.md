# PR Review Loop Demo

This repo demonstrates a GitHub-native loop:

1. Push code to GitHub on a feature branch.
2. Open or update a pull request.
3. A GitHub Actions workflow asks OpenAI to review the changed code and return a score from 0 to 10.
4. The workflow posts the score back to the pull request.
5. If the score is below 8 and the loop has run fewer than 5 times, the workflow asks OpenAI to rewrite the flagged files, commits the changes, and pushes them back to the same branch.
6. The new push retriggers the review until the score reaches 8 or the retry limit is reached.

## Repo contents

- `src/priority.js`: intentionally weak demo code for the reviewer to critique.
- `test/priority.test.js`: a minimal happy-path test.
- `.github/workflows/review-loop.yml`: the GitHub Actions loop.
- `scripts/review.mjs`: generates the score and review JSON.
- `scripts/fix.mjs`: rewrites flagged files and updates loop state.

## GitHub setup

1. Create an empty GitHub repository.
2. In this folder, run:

```powershell
git init
git add .
git commit -m "Initial demo scaffold"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

3. In the GitHub repository settings, add this secret:

```text
OPENAI_API_KEY
```

4. Optionally add these repository variables if you want to override defaults:

```text
OPENAI_REVIEW_MODEL=gpt-4.1-mini
OPENAI_FIX_MODEL=gpt-4.1-mini
```

## Running the demo

1. Install dependencies locally:

```powershell
npm install
```

2. Create a feature branch:

```powershell
git checkout -b demo/review-loop
```

3. Make the code in `src/priority.js` worse or better, commit it, and push the branch.
4. Open a pull request to `main`.
5. Watch the `PR Review Loop` workflow run.

The workflow comments on the PR with:

- the current score
- the attempt count
- the main issues
- whether it stopped or pushed another fix

## Important limits

- Auto-push only works for branches in the same repository. It is intentionally disabled for forked PRs.
- The review score is model output, not a GitHub-native metric.
- The fixer rewrites full file contents for the files flagged by the reviewer. Keep the demo small.
- The loop state is stored in `.loop-state.json` on the PR branch so retries survive across workflow runs.
