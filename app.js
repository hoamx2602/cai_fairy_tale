import { stories, comingSoon } from './story-data.js';
import { nextPage, restoreProgress, pageNumberFromFilename } from './state.js';

const app = document.querySelector('#app');
const fileInput = document.querySelector('#audio-files');
let story = stories[0];
const saved = restoreProgress(localStorage.getItem(`cai-story:${story.id}`), story.pages.length);
let view = 'library';
let pageIndex = saved.page;
let completed = saved.completed;
let turning = false;
let scriptsOpen = false;
let audioPanelOpen = false;
let autoVoice = false;
let activeAudio = null;
let audioUrls = new Map();
let toastTimer;
let pointerStart = null;

const icons = {
  book: '<path d="M4 5c5-2 8 1 8 1s3-3 8-1v14c-5-2-8 1-8 1s-3-3-8-1zM12 6v14"/>',
  arrow: '<path d="m9 18 6-6-6-6"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  sound: '<path d="m11 5-5 4H3v6h3l5 4zM15 9c2 2 2 4 0 6m3-9c4 4 4 8 0 12"/>',
  pause: '<path d="M8 6v12M16 6v12" stroke-width="3"/>',
  upload: '<path d="M12 16V4m-5 5 5-5 5 5M5 20h14"/>',
  script: '<path d="M7 3h10l3 3v15H4V3zM8 9h8m-8 4h8m-8 4h5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M8 21H3v-5m13 5h5v-5"/>',
  home: '<path d="m3 11 9-8 9 8v10h-6v-7H9v7H3z"/>',
  moon: '<path d="M20 15a8 8 0 0 1-11-11 9 9 0 1 0 11 11Z"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  spark: '<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;

function save() {
  localStorage.setItem(`cai-story:${story.id}`, JSON.stringify({ page: pageIndex, completed }));
}

function selectStory(id) {
  story = stories.find(item => item.id === id) || stories[0];
  const progress = restoreProgress(localStorage.getItem(`cai-story:${story.id}`), story.pages.length);
  pageIndex = progress.page;
  completed = progress.completed;
  stopAudio();
}

const audioKey = (index = pageIndex) => `${story.id}:${index}`;

function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function preload() {
  story.pages.forEach(({image}) => { const img = new Image(); img.src = image; });
}

function renderLibrary() {
  selectStory(stories[0].id);
  view = 'library';
  document.body.className = 'library-mode';
  app.innerHTML = `
    <header class="site-header">
      <button class="wordmark" data-action="library" aria-label="Chuyện của Cải, trang chủ"><span class="mark">C</span><span><b>Chuyện của Cải</b><small>MỖI TỐI, MỘT THẾ GIỚI MỚI</small></span></button>
      <div class="header-note">Một thư viện nhỏ dành riêng cho Cải <span>✦</span></div>
    </header>
    <main class="library" id="main">
      <section class="featured" aria-labelledby="featured-title">
        <img src="${story.pages[0].image}" alt="${story.pages[0].alt}" fetchpriority="high">
        <div class="featured-shade"></div>
        <div class="featured-copy">
          <span class="episode-label">TẬP 01 · ${story.pages.length} TRANG MINH HOẠ</span>
          <h1 id="featured-title">Cải và<br><em>${story.shortTitle}</em></h1>
          <p>${story.summary}</p>
          <div class="theme-row">${story.themes.map(t=>`<span>${t}</span>`).join('')}</div>
          <div class="featured-actions">
            <button class="read-button" data-action="read" data-story="${story.id}">${icon('book')} ${pageIndex > 0 && !completed ? `Đọc tiếp · Trang ${pageIndex + 1}` : 'Mở truyện'}</button>
            <button class="ghost-button" data-action="script">${icon('script')} Xem kịch bản lồng tiếng</button>
          </div>
          <div class="story-meta"><span>${story.age}</span><i></i><span>${story.readTime}</span><i></i><span>${story.pages.length} tranh minh hoạ</span></div>
        </div>
      </section>
      <section class="shelf" aria-labelledby="shelf-title">
        <div class="shelf-heading"><div><span>THƯ VIỆN CỦA CẢI</span><h2 id="shelf-title">Những câu chuyện tiếp theo</h2></div><p>Những chuyến phiêu lưu mới sẽ lần lượt xuất hiện ở đây.</p></div>
        <div class="story-grid">
          ${stories.map(item=>`<button class="story-card ready" data-action="read" data-story="${item.id}"><div class="card-image"><img src="${item.pages[0].image}" alt=""><span class="ready-tag">ĐỌC NGAY</span></div><div class="card-copy"><small>${item.seriesNumber ? `TẬP ${item.seriesNumber}` : 'NGOẠI TRUYỆN'}</small><h3>${item.shortTitle}</h3><p>${item.themes.join(' · ')}</p></div></button>`).join('')}
          ${comingSoon.map(item=>`<article class="story-card coming ${item.color}"><div class="coming-art"><span>${item.icon}</span><b>ĐANG VIẾT</b></div><div class="card-copy"><small>TẬP ${item.number}</small><h3>${item.title}</h3><p>${item.note}</p></div></article>`).join('')}
        </div>
      </section>
    </main>
    <footer class="site-footer"><span>Viết và vẽ riêng cho Cải</span><span>Không quảng cáo · Không tự chạy · Không thu thập dữ liệu</span></footer>
    ${scriptDrawer()}`;
  bindDrawerState();
}

function pageMarkup(page, index, className) {
  const isCover = index === 0;
  return `<article class="book-page ${className} ${isCover ? 'cover-page' : ''}" aria-label="Trang ${index + 1} trên ${story.pages.length}">
    <img src="${page.image}" alt="${page.alt}" draggable="false">
    <div class="image-vignette"></div>
    ${isCover ? `<div class="cover-copy"><span>${story.kicker}</span><h1>Cải và<br><em>${story.shortTitle}</em></h1><p>${story.themes.join(' · ')}</p></div>` : `<div class="story-copy"><div class="narration">${page.narration}</div>${page.dialogue.length ? `<div class="dialogue-lines">${page.dialogue.map(d=>`<p><b>${d.who}</b> “${d.text}”</p>`).join('')}</div>` : ''}</div>`}
    <span class="printed-page">${String(index + 1).padStart(2,'0')}</span>
  </article>`;
}

function renderReader() {
  view = 'reader';
  document.body.className = 'reader-mode';
  const current = story.pages[pageIndex];
  app.innerHTML = `<main class="reader" id="main">
    <div class="reader-chrome top-chrome">
      <button class="circle-button" data-action="library" aria-label="Về thư viện">${icon('home')}</button>
      <div class="reader-title"><small>${story.seriesNumber ? `TẬP ${story.seriesNumber}` : 'NGOẠI TRUYỆN'}</small><b>${story.shortTitle}</b></div>
      <div class="reader-tools">
        <button class="tool-button ${audioPanelOpen ? 'active' : ''}" data-action="audio-panel" aria-label="Giọng đọc">${icon('sound')}<span>Giọng đọc</span></button>
        <button class="tool-button ${scriptsOpen ? 'active' : ''}" data-action="script" aria-label="Kịch bản">${icon('script')}<span>Kịch bản</span></button>
        <button class="circle-button" data-action="fullscreen" aria-label="Toàn màn hình">${icon('expand')}</button>
      </div>
    </div>
    <section class="book-stage" aria-live="polite">
      <div class="page-under"></div>
      <div class="page-current">${pageMarkup(current, pageIndex, 'front-page')}</div>
      <button class="tap-zone tap-prev" data-action="prev" aria-label="Trang trước"></button>
      <button class="tap-zone tap-next" data-action="next" aria-label="Trang sau"></button>
    </section>
    <div class="reader-chrome bottom-chrome">
      <button class="nav-button" data-action="prev" ${pageIndex === 0 ? 'disabled' : ''}>${icon('back')}<span>Trang trước</span></button>
      <div class="page-progress"><div class="progress-track"><span style="width:${((pageIndex + 1) / story.pages.length) * 100}%"></span></div><b>${pageIndex + 1} <i>/</i> ${story.pages.length}</b></div>
      <button class="nav-button next" data-action="next" ${pageIndex === story.pages.length - 1 ? 'disabled' : ''}><span>Trang sau</span>${icon('arrow')}</button>
    </div>
    ${audioPanel()}
    ${scriptDrawer()}
  </main>`;
  bindDrawerState();
  bindAudioState();
}

function currentScriptText() {
  const p = story.pages[pageIndex];
  return [`TRANG ${pageIndex + 1}`, p.narration, ...p.dialogue.map(d=>`${d.who}: “${d.text}”`), `Chỉ dẫn giọng: ${p.voice}`].filter(Boolean).join('\n\n');
}

function scriptDrawer() {
  const p = story.pages[pageIndex];
  return `<aside class="script-drawer ${scriptsOpen ? 'open' : ''}" aria-hidden="${!scriptsOpen}" ${scriptsOpen ? '' : 'hidden inert'}>
    <div class="drawer-head"><div><small>KỊCH BẢN LỒNG TIẾNG</small><h2>${view === 'reader' ? `Trang ${pageIndex + 1}` : story.title}</h2></div><button class="circle-button light" data-action="close-script" aria-label="Đóng kịch bản">${icon('close')}</button></div>
    ${view === 'reader' ? `<div class="script-page"><span>LỜI KỂ</span><p>${p.narration || 'Đọc tên truyện và dòng phụ.'}</p>${p.dialogue.map(d=>`<blockquote><b>${d.who}</b><p>“${d.text}”</p></blockquote>`).join('')}<div class="voice-note"><b>Chỉ dẫn giọng</b><p>${p.voice}</p></div><button class="copy-button" data-action="copy-script">${icon('copy')} Sao chép trang này</button></div>` : `<div class="script-intro"><p>Toàn bộ lời kể, hội thoại, mô tả cảnh và chỉ dẫn giọng đã được tách theo ${story.pages.length} trang.</p><p>Bạn có thể mở truyện rồi dùng nút <b>Kịch bản</b> ở từng trang, hoặc mở file Markdown đầy đủ trong dự án.</p><button class="read-button compact" data-action="read" data-story="${story.id}">${icon('book')} Mở truyện và xem từng trang</button></div>`}
  </aside><button class="drawer-backdrop ${scriptsOpen ? 'show' : ''}" data-action="close-script" aria-label="Đóng kịch bản" ${scriptsOpen ? '' : 'hidden'}></button>`;
}

function audioPanel() {
  const hasAudio = audioUrls.has(audioKey());
  return `<aside class="audio-panel ${audioPanelOpen ? 'open' : ''}" aria-hidden="${!audioPanelOpen}" ${audioPanelOpen ? '' : 'hidden inert'}>
    <div><small>GIỌNG ĐỌC · TRANG ${pageIndex + 1}</small><b>${hasAudio ? 'Đã có file âm thanh' : 'Chưa có giọng đọc'}</b></div>
    ${hasAudio ? `<button class="audio-play" data-action="play-audio">${activeAudio && !activeAudio.paused ? icon('pause') : icon('sound')} ${activeAudio && !activeAudio.paused ? 'Tạm dừng' : 'Nghe trang này'}</button>` : `<button class="audio-play" data-action="pick-audio">${icon('upload')} Nạp file thu âm</button>`}
    <label class="auto-voice"><input type="checkbox" data-action="auto-voice" ${autoVoice ? 'checked' : ''}><span>Tự đọc khi lật trang</span></label>
    <p>Tên file theo mẫu <code>page-02.mp3</code>. Có thể chọn cùng lúc nhiều trang.</p>
  </aside>`;
}

function bindDrawerState() {
  const drawer = document.querySelector('.script-drawer');
  if (drawer && scriptsOpen) drawer.querySelector('button')?.focus({preventScroll:true});
}

function bindAudioState() {
  document.querySelector('.audio-panel')?.classList.toggle('open', audioPanelOpen);
}

function go(direction) {
  if (turning) return;
  const target = nextPage(pageIndex, story.pages.length, direction);
  if (target === pageIndex) {
    if (pageIndex === story.pages.length - 1 && direction === 'next') finishStory();
    return;
  }
  stopAudio();
  turning = true;
  const stage = document.querySelector('.book-stage');
  const under = stage.querySelector('.page-under');
  under.innerHTML = pageMarkup(story.pages[target], target, 'under-page');
  stage.classList.add(direction === 'prev' ? 'turn-prev' : 'turn-next');
  setTimeout(() => {
    pageIndex = target;
    if (pageIndex === story.pages.length - 1) completed = true;
    save();
    turning = false;
    renderReader();
    if (autoVoice) playAudio();
  }, 760);
}

function finishStory() {
  completed = true;
  save();
  toast('Cải đã đọc hết câu chuyện ✦');
}

function stopAudio() {
  if (activeAudio) { activeAudio.pause(); activeAudio.currentTime = 0; activeAudio = null; }
}

function playAudio() {
  const src = audioUrls.get(audioKey());
  if (!src) { if (autoVoice) toast(`Trang ${pageIndex + 1} chưa có file giọng đọc.`); return; }
  if (activeAudio && !activeAudio.paused) { activeAudio.pause(); renderReader(); return; }
  stopAudio();
  activeAudio = new Audio(src);
  activeAudio.onended = () => { activeAudio = null; renderReader(); };
  activeAudio.play().then(renderReader).catch(()=>toast('Trình duyệt chưa cho phép phát âm thanh.'));
}

function loadAudioFiles(files) {
  let count = 0;
  for (const file of files) {
    const index = pageNumberFromFilename(file.name, story.pages.length);
    if (index === null) continue;
    const key = audioKey(index);
    const old = audioUrls.get(key);
    if (old) URL.revokeObjectURL(old);
    audioUrls.set(key, URL.createObjectURL(file));
    count++;
  }
  toast(count ? `Đã nạp giọng đọc cho ${count} trang trong phiên này.` : 'Không nhận ra số trang trong tên file. Ví dụ: page-02.mp3');
  fileInput.value = '';
  if (view === 'reader') renderReader();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === 'read') { selectStory(button.dataset.story || story.id); scriptsOpen = false; renderReader(); preload(); }
  if (action === 'library') { stopAudio(); scriptsOpen = false; audioPanelOpen = false; renderLibrary(); }
  if (action === 'next' || action === 'prev') go(action);
  if (action === 'script') { scriptsOpen = !scriptsOpen; if (view === 'reader') renderReader(); else renderLibrary(); }
  if (action === 'close-script') { scriptsOpen = false; if (view === 'reader') renderReader(); else renderLibrary(); }
  if (action === 'audio-panel') { audioPanelOpen = !audioPanelOpen; renderReader(); }
  if (action === 'pick-audio') fileInput.click();
  if (action === 'play-audio') playAudio();
  if (action === 'fullscreen') toggleFullscreen();
  if (action === 'copy-script') {
    try { await navigator.clipboard.writeText(currentScriptText()); toast(`Đã sao chép kịch bản trang ${pageIndex + 1}.`); }
    catch { toast('Không thể sao chép tự động trên trình duyệt này.'); }
  }
});

document.addEventListener('change', (event) => {
  if (event.target === fileInput) loadAudioFiles(event.target.files);
  if (event.target.matches('[data-action="auto-voice"]')) autoVoice = event.target.checked;
});

document.addEventListener('keydown', (event) => {
  if (view !== 'reader' || scriptsOpen) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); go('next'); }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); go('prev'); }
  if (event.key === 'Escape') renderLibrary();
});

document.addEventListener('pointerdown', (event) => {
  if (view === 'reader' && !event.target.closest('button, aside')) pointerStart = {x:event.clientX,y:event.clientY};
});
document.addEventListener('pointerup', (event) => {
  if (!pointerStart || view !== 'reader') return;
  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  pointerStart = null;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 'next' : 'prev');
});

document.addEventListener('visibilitychange', () => { if (document.hidden) stopAudio(); });
renderLibrary();
