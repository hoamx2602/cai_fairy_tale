import test from 'node:test';
import assert from 'node:assert/strict';
import { freshState, transition as next, restore, stamps, PARTS } from '../state.js';

test('a child can complete the story, retrying mistakes without losing progress', () => {
  let s = next(freshState(), {type:'start'});
  s = next(s, {type:'workshop'}); assert.equal(s.stage,1);
  for (const part of ['leaf','wheel','gear']) s = next(s,{type:'collect',part});
  s = next(s,{type:'collect',part:'wheel'}); assert.equal(s.collected.length,3);
  assert.deepEqual(stamps(s),[true,false,false]);
  s = next(s,{type:'workshop'});
  const before = structuredClone(s);
  s = next(s,{type:'assemble',part:'leaf'}); assert.deepEqual(s,before);
  for (const part of PARTS) s = next(s,{type:'assemble',part});
  assert.equal(s.stage,3); assert.deepEqual(stamps(s),[true,true,false]);
  s = next(s,{type:'calm'});
  s = next(s,{type:'experiment',choice:'rock'}); assert.equal(s.stage,4);
  s = next(s,{type:'experiment',choice:'fan'}); assert.equal(s.completed,true);
  assert.deepEqual(stamps(s),[true,true,true]); assert.deepEqual(restore(JSON.stringify(s)),s);
});
test('save can resume every playable stage',()=>{
  let s = freshState();
  const actions = [{type:'start'},...PARTS.map(part=>({type:'collect',part})),{type:'workshop'},...PARTS.map(part=>({type:'assemble',part})),{type:'calm'},{type:'experiment',choice:'fan'}];
  for (const action of actions) { s = next(s,action); assert.deepEqual(restore(JSON.stringify(s)),s); }
});
test('corrupt or impossible saves recover to a playable state',()=>{
  for (const bad of ['bad json',null,'null','{}','{"version":2}']) assert.deepEqual(restore(bad),freshState());
  const s = restore(JSON.stringify({version:1,stage:5,collected:['wheel','wheel','fake'],assembled:99,completed:true}));
  assert.equal(s.stage,1); assert.equal(s.completed,false); assert.equal(s.assembled,0); assert.deepEqual(s.collected,['wheel']);
  assert.equal(restore(JSON.stringify({version:1,stage:5,collected:PARTS,assembled:0,completed:true})).stage,2);
});
test('out-of-order inputs cannot skip tasks or mutate original state',()=>{
  const original = freshState();
  for (const action of [{type:'collect',part:'wheel'},{type:'assemble',part:'wheel'},{type:'calm'},{type:'experiment',choice:'fan'}]) assert.deepEqual(next(original,action),original);
  assert.deepEqual(original,freshState());
});
