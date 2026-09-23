export const PARTS = ['wheel', 'gear', 'leaf'];
export const freshState = () => ({ version: 1, stage: 0, collected: [], assembled: 0, completed: false, sound: false });
export function restore(raw) {
  try {
    const s = JSON.parse(raw);
    if (s?.version !== 1) return freshState();
    const collected = [...new Set(Array.isArray(s.collected) ? s.collected.filter(x => PARTS.includes(x)) : [])];
    const assembled = Number.isInteger(s.assembled) ? Math.max(0, Math.min(3, s.assembled)) : 0;
    let stage = Number.isInteger(s.stage) ? Math.max(0, Math.min(5, s.stage)) : 0;
    if (stage >= 2 && collected.length !== 3) stage = 1;
    if (stage >= 3 && assembled !== 3) stage = 2;
    if (stage === 5 && s.completed !== true) stage = 4;
    return { version: 1, stage, collected, assembled: collected.length === 3 ? assembled : 0, completed: s.completed === true && stage === 5, sound: s.sound === true };
  } catch { return freshState(); }
}
export function transition(state, action) {
  const s = { ...state, collected: [...state.collected] };
  if (action.type === 'start' && s.stage === 0) s.stage = 1;
  if (action.type === 'collect' && s.stage === 1 && PARTS.includes(action.part) && !s.collected.includes(action.part)) s.collected.push(action.part);
  if (action.type === 'workshop' && s.stage === 1 && s.collected.length === 3) s.stage = 2;
  if (action.type === 'assemble' && s.stage === 2 && action.part === PARTS[s.assembled]) {
    s.assembled++;
    if (s.assembled === 3) s.stage = 3;
  }
  if (action.type === 'calm' && s.stage === 3) s.stage = 4;
  if (action.type === 'experiment' && s.stage === 4 && action.choice === 'fan') { s.stage = 5; s.completed = true; }
  return s;
}
export function stamps(s) { return [s.collected.length === 3, s.assembled === 3, s.completed]; }
