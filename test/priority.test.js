import test from 'node:test';
import assert from 'node:assert/strict';

import { parsePriority } from '../src/priority.js';

test('parsePriority returns the numeric priority for a valid value', () => {
  assert.equal(parsePriority('3'), 3);
});
