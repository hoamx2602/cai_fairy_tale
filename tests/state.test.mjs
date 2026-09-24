import test from 'node:test';
import assert from 'node:assert/strict';
import { clampPage, nextPage, restoreProgress, pageNumberFromFilename } from '../state.js';

test('page navigation stays inside the book', () => {
  assert.equal(nextPage(0, 14, 'prev'), 0);
  assert.equal(nextPage(0, 14, 'next'), 1);
  assert.equal(nextPage(13, 14, 'next'), 13);
  assert.equal(clampPage(99, 14), 13);
});

test('saved progress is restored safely', () => {
  assert.deepEqual(restoreProgress('{"page":7,"completed":true}', 14), { page: 7, completed: true });
  assert.deepEqual(restoreProgress('broken', 14), { page: 0, completed: false });
  assert.deepEqual(restoreProgress('{"page":-10}', 14), { page: 0, completed: false });
});

test('audio filenames map to story pages', () => {
  assert.equal(pageNumberFromFilename('story-01-page-02.mp3', 14), 1);
  assert.equal(pageNumberFromFilename('trang_14.wav', 14), 13);
  assert.equal(pageNumberFromFilename('voice.mp3', 14), null);
  assert.equal(pageNumberFromFilename('page-22.mp3', 14), null);
});
