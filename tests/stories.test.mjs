import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { stories } from '../story-data.js';

test('every published story has a unique id and a picture-book length', () => {
  assert.equal(new Set(stories.map(story => story.id)).size, stories.length);
  for (const story of stories) {
    assert.ok(story.pages.length >= 12 && story.pages.length <= 15, `${story.id} has ${story.pages.length} pages`);
    assert.ok(story.title && story.summary && story.themes.length >= 2);
  }
});

test('every story page has its image and voice direction', () => {
  for (const story of stories) {
    for (const [index, page] of story.pages.entries()) {
      assert.ok(existsSync(resolve(page.image)), `${story.id} page ${index + 1} image is missing`);
      assert.ok(page.alt, `${story.id} page ${index + 1} needs alt text`);
      assert.ok(page.voice, `${story.id} page ${index + 1} needs voice direction`);
      if (index > 0) assert.ok(page.narration || page.dialogue.length, `${story.id} page ${index + 1} needs story text`);
    }
  }
});
