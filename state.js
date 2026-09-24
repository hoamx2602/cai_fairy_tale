export function clampPage(value, total) {
  const page = Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : 0;
  return Math.min(Math.max(page, 0), Math.max(total - 1, 0));
}

export function nextPage(current, total, direction) {
  return clampPage(current + (direction === 'prev' ? -1 : 1), total);
}

export function restoreProgress(raw, total) {
  try {
    const saved = JSON.parse(raw);
    return { page: clampPage(saved?.page, total), completed: saved?.completed === true };
  } catch {
    return { page: 0, completed: false };
  }
}

export function pageNumberFromFilename(name, total) {
  const stem = name.replace(/\.[^.]+$/, '');
  const matches = stem.match(/(?:page|trang|p)[-_ ]?(\d{1,2})$/i) || stem.match(/(\d{1,2})$/);
  if (!matches) return null;
  const page = Number(matches[1]);
  return page >= 1 && page <= total ? page - 1 : null;
}
