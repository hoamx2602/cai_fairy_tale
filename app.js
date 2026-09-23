import { PARTS, freshState, restore, transition, stamps } from './state.js';

const main = document.querySelector('main');
const modal = document.querySelector('#modal');
const KEY = 'cai-adventure-v1';
let state;
try { state = restore(localStorage.getItem(KEY)); } catch { state = freshState(); }
let page = 'home', audio, toastTimer, breathTimer, breathTick = 0, currentLine = '', lastFocused, soundAt = 0;
const paths = {
  play: '<path d="m9 5 11 7-11 7z" fill="currentColor" stroke="none"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  leaf: '<path d="M20 3C7 2 2 8 5 16s15 3 15-13Z" fill="#9ab96a"/><path d="M4 21 16 8m-8 9-1-6m5 2 5 1"/>',
  book: '<path d="M12 5C8 2 3 4 3 4v16s5-2 9 0c4-2 9 0 9 0V4s-5-2-9 1Zm0 0v15"/>',
  sound: '<path d="m11 4-6 5H2v6h3l6 5zM15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
  mute: '<path d="m11 4-6 5H2v6h3l6 5zM16 9l6 6m0-6-6 6"/>',
  people: '<circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6m2 4c3 1 4 3 4 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  sparkle: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>',
  check: '<path d="m5 12 4 4L20 5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 1 1 5 3c-2 1-2 2-2 3m0 3v.1"/>',
  wheel: '<circle cx="12" cy="12" r="9" fill="#d8a260" stroke="#966237" stroke-width="3"/><circle cx="12" cy="12" r="2" fill="#faf1d0"/><path d="M12 3v7m0 4v7M3 12h7m4 0h7M6 6l4 4m4 4 4 4M6 18l4-4m4-4 4-4" stroke="#966237"/>',
  gear: '<path d="m9 2 6 0 1 4 4 1 2 5-3 3 0 5-5 2-3-3-5 0-2-5 3-3-1-5z" fill="#ecc05e" stroke="#aa7b32"/><circle cx="12" cy="12" r="3" fill="#fff5d9" stroke="#aa7b32"/>',
  heart: '<path d="M12 21 3 12C-3 4 7-1 12 6c5-7 15-2 9 6Z" fill="currentColor" stroke="none"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5z" fill="currentColor"/>',
  repeat: '<path d="M20 8a9 9 0 1 0 1 7M20 3v5h-5"/>',
  flag: '<path d="M5 22V3c5-5 9 5 15 0v11c-6 5-10-5-15 0"/>',
  fan: '<circle cx="12" cy="12" r="2" fill="#c99d5c"/><path d="M12 10C2-1 22-2 14 10M14 12c15-3 7 15-1 2M10 13C2 27-3 7 10 11" fill="#a9c478"/>',
  horn: '<path d="M3 10h6l10-6v16l-10-6H3z" fill="#e3b55c"/><path d="m8 14 2 7h4l-3-6"/>',
  rock: '<path d="m3 19 2-9 7-6 7 4 3 11z" fill="#b5b7a6"/><path d="m5 10 7 3 7-5m-7 5 2 6"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>'
};
function icon(name, cls = '') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.sparkle}</svg>`; }
const partNames = { wheel: 'Bánh xe', gear: 'Bánh răng', leaf: 'Chiếc lá' };
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* Session remains playable if browser storage is unavailable. */ } updateHeader(); }
function apply(action) { state = transition(state, action); save(); }
function stopNarration() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
function cleanup() { clearInterval(breathTimer); breathTimer = null; stopNarration(); }
function navigate(next) { cleanup(); page = next; render(); window.scrollTo({ top: 0, behavior: 'instant' }); main.focus({ preventScroll: true }); }
function updateHeader() {
  document.querySelector('.sound').innerHTML = icon(state.sound ? 'sound' : 'mute');
  document.querySelector('.sound').setAttribute('aria-label', state.sound ? 'Tắt âm thanh' : 'Bật âm thanh');
  document.querySelector('.sound').setAttribute('aria-pressed', String(state.sound));
  document.querySelector('.parent-icon').innerHTML = icon('people');
  document.querySelector('.journal-count').textContent = stamps(state).filter(Boolean).length;
  document.querySelectorAll('.nav-item').forEach(el => { const active = page === 'journal' ? el.dataset.action === 'journal' : el.dataset.action === 'home'; el.classList.toggle('active', active); if (active) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current'); });
}
function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3600); }
function sound(kind = 'pick') {
  if (!state.sound) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    audio ||= new Audio(); audio.resume();
    const t = audio.currentTime;
    const o = audio.createOscillator(), g = audio.createGain();
    o.connect(g); g.connect(audio.destination);
    if (kind === 'bum') { o.type = 'sawtooth'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(38, t + .35); g.gain.setValueAtTime(.035, t); g.gain.exponentialRampToValueAtTime(.001, t + .4); o.start(); o.stop(t + .42); }
    else { o.type = 'sine'; o.frequency.setValueAtTime(kind === 'win' ? 523 : 630, t); o.frequency.setValueAtTime(kind === 'win' ? 784 : 840, t + .1); g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.001, t + .3); o.start(); o.stop(t + .32); }
  } catch { /* Audio is optional. */ }
}
function readLine() {
  if (!('speechSynthesis' in window)) { toast('Máy này chưa có giọng đọc. Bố mẹ cùng đọc cho Cải nhé!'); return; }
  const voices = window.speechSynthesis.getVoices();
  const vi = voices.find(v => /^vi(?:-|_)/i.test(v.lang) && v.localService) || voices.find(v => /^vi(?:-|_)/i.test(v.lang));
  if (!vi) { toast('Chưa tìm thấy giọng tiếng Việt trên máy. Bố mẹ cùng kể nhé!'); return; }
  stopNarration();
  const u = new SpeechSynthesisUtterance(currentLine); u.voice = vi; u.lang = 'vi-VN'; u.rate = .88;
  u.onerror = () => toast('Giọng đọc chưa sẵn sàng. Mình cùng đọc lời thoại nhé!');
  window.speechSynthesis.speak(u);
}
function render() { updateHeader(); if (page === 'home') renderHome(); else if (page === 'journal') renderJournal(); else renderGame(); }
function renderHome() {
  const continuing = state.stage > 0 && !state.completed;
  main.innerHTML = `<section class="hero" aria-labelledby="hero-title"><div class="hero-content"><span class="eyebrow">${icon('leaf')} THẾ GIỚI NHỎ, PHIÊU LƯU TO</span><h1 id="hero-title">Một chiếc <em>bủm.</em><br>Cả một cuộc<br>phiêu lưu!</h1><p>Cùng Cải và hamster Bắp bước vào khu vườn tí hon. Bạn mới, bí mật mới và… một mùi gì lạ lắm!</p><button class="primary" data-action="play">${icon('play')}${state.completed ? 'Chơi lại cùng Cải' : continuing ? 'Tiếp tục cùng Cải' : 'Nào, mình đi thôi!'}${icon('arrow')}</button><div class="hero-meta"><span>${icon('clock')}Một câu chuyện ngắn</span><span>${icon('people')}Vui hơn khi chơi cùng bố mẹ</span></div></div><div class="hero-art"><img src="assets/garden-adventure.png" alt="Cải và hamster Bắp gặp Sâu Bủm bên chiếc xe lá trong khu vườn đầy nắng" fetchpriority="high"><div class="adventure-sticker">Dành riêng cho<b>nhà thám hiểm Cải</b>6 tuổi · Vạn điều tò mò</div><div class="speech-bubble">“Bắp ơi, có mùi phiêu lưu!”</div><span class="hero-note">TẬP 01 · BÍ MẬT KHU VƯỜN TÍ HON</span></div></section>
  <section aria-labelledby="chapters-title"><div class="section-heading"><div><h2 id="chapters-title">Những chuyến đi của Cải</h2><p>Mỗi câu chuyện, một điều hay đang chờ được khám phá.</p></div><span>HÀNH TRÌNH MỚI BẮT ĐẦU</span></div><div class="chapters"><button class="chapter playable" data-action="play"><img class="chapter-art" src="assets/references/adventure-style.png" alt="Cải cưỡi hamster khám phá khu vườn"><div><small>CUỘC PHIÊU LƯU 01</small><h3>Bí mật khu vườn tí hon</h3><p>Một người bạn có hơi… đặc biệt.</p><span class="chapter-status">${icon(state.completed ? 'check' : 'play')}${state.completed ? 'Đã khám phá · Chơi lại' : continuing ? 'Đang khám phá · Tiếp tục' : 'Sẵn sàng khám phá'}</span></div></button><article class="chapter unavailable"><div class="chapter-art fantasy" aria-hidden="true">🚂</div><div><small>Ý TƯỞNG TẬP 02</small><h3>Ga tàu Cà Rốt</h3><p>Một chuyến tàu. Vạn điều bất ngờ.</p><span class="chapter-status">Đang ươm mầm</span></div></article><article class="chapter unavailable"><div class="chapter-art fantasy space" aria-hidden="true">🚀</div><div><small>Ý TƯỞNG TẬP 03</small><h3>Tên lửa Khoai Tây</h3><p>Vũ trụ ơi, Cải đến đây!</p><span class="chapter-status">Đang ươm mầm</span></div></article></div></section>
  <aside class="family-note"><span aria-hidden="true">🌱</span><p><b>Một chút tò mò. Một chút can đảm. Thật nhiều niềm vui.</b><br>Không cần vội, không sợ sai. Cải cứ thử, có bạn bè ở đây rồi!</p><button data-action="parents">Gửi bố mẹ ${icon('arrow')}</button></aside>`;
}
function medals() { return `<div class="stamps">${[['compass','Nhà khám phá'],['gear','Không bỏ cuộc'],['heart','Người bạn tốt']].map(([i,t], n) => `<div class="stamp ${stamps(state)[n] ? 'earned' : ''}"><span class="stamp-medal">${icon(i)}</span><span>${t}</span><small>${stamps(state)[n] ? 'Đã nhận' : 'Chưa khám phá'}</small></div>`).join('')}</div>`; }
function renderJournal() { main.innerHTML = `<section class="journal-page"><span class="eyebrow">${icon('book')} NHỮNG ĐIỀU CẢI ĐÃ LÀM ĐƯỢC</span><h1>Sổ khám phá của Cải</h1><p>Mỗi dấu nhỏ giữ lại một kỷ niệm thật to.<br>Cứ từ từ khám phá, không cần giành thật nhiều đâu!</p>${medals()}<div class="journal-description"><p><b>Nhà khám phá:</b> tìm đủ ba món đồ trong khu vườn.</p><p><b>Không bỏ cuộc:</b> lắp lại chiếc xe, từng bộ phận một.</p><p><b>Người bạn tốt:</b> giúp Sâu Bủm đưa hạt giống về vườn.</p></div><button class="primary" data-action="${state.completed ? 'home' : 'play'}">${icon(state.completed ? 'back' : 'play')}${state.completed ? 'Về trang đầu' : 'Tiếp tục khám phá'}</button></section>`; }
function dialogue(speaker, text, action, label) {
  currentLine = `${speaker}. ${text}`;
  return `<section class="dialogue" aria-label="Lời kể"><span class="portrait portrait-${speaker.startsWith('Bắp') ? 'bap' : speaker.startsWith('Sâu') ? 'bum' : 'cai'}" aria-hidden="true"></span><div class="dialogue-copy" aria-live="polite"><span class="speaker">${speaker}</span><p id="story-line">${text}</p></div><div class="dialogue-actions"><button class="read-button" data-action="read" aria-label="Nghe lời thoại bằng tiếng Việt">${icon('sound')}</button>${action ? `<button class="primary" data-action="${action}">${label}${icon('arrow')}</button>` : ''}</div></section>`;
}
function renderGame() {
  stopNarration();
  clearInterval(breathTimer); breathTimer = null;
  if (state.completed) { renderEnd(); return; }
  const mission = ['Lắng nghe tiếng động trong vườn',`Tìm đồ giúp Bủm · ${state.collected.length}/3 món`,'Lắp chiếc xe lá cùng Cải','Chậm lại một chút, Cải nhé','Làm sao để chiếc xe chạy được?'][state.stage];
  let sceneExtra = '', bottom = '';
  if (state.stage === 0) bottom = dialogue('Bắp · Bạn đồng hành', 'BỦM! Ối, tên lửa cà rốt à? À không… xe chở hạt của bạn sâu bị bung mất rồi. Cải giúp bạn nhé?', 'begin', 'Mình giúp bạn!');
  if (state.stage === 1) {
    const coords = [[43,73],[66,45],[82,69]];
    sceneExtra = PARTS.map((part,i) => state.collected.includes(part) ? '' : `<button class="hotspot" data-action="collect" data-part="${part}" style="left:${coords[i][0]}%;top:${coords[i][1]}%" aria-label="Nhặt ${partNames[part].toLowerCase()}"><span class="object">${icon(part)}</span><span class="label">${partNames[part]}</span></button>`).join('');
    sceneExtra += `<div class="inventory" aria-label="Túi đồ: ${state.collected.length} trên 3 món">${PARTS.map(p => `<span class="${state.collected.includes(p) ? 'filled' : ''}" title="${partNames[p]}">${state.collected.includes(p) ? icon(p) : '·'}</span>`).join('')}</div>`;
    bottom = dialogue('Cải · Nhà thám hiểm', state.collected.length === 3 ? 'Đủ ba món rồi! Bánh xe, bánh răng và một chiếc lá. Để Cải thử lắp lại nhé!' : 'Một bánh xe, một bánh răng, một chiếc lá… Chúng trốn ở đâu nhỉ? Chạm vào món đồ để nhặt nhé!', state.collected.length === 3 ? 'workshop' : null, 'Đến xưởng xe');
  }
  if (state.stage === 2) {
    const questions = ['Món nào giúp xe lăn được?','Món nào truyền chuyển động?','Món nào làm cánh quạt đón gió?'];
    sceneExtra = `<div class="workshop"><span class="eyebrow">XƯỞNG CỦA CẢI · ${state.assembled + 1}/3</span><h2>${questions[state.assembled]}</h2><p>Chạm vào bộ phận Cải muốn lắp.</p><div class="assembly-slots">${PARTS.map((p,i) => `<span class="${i < state.assembled ? 'installed' : ''}">${i < state.assembled ? icon(p) : i+1}</span>`).join('')}</div><div class="part-options">${PARTS.map((p,i) => `<button class="part-option ${i < state.assembled ? 'installed' : ''}" data-action="assemble" data-part="${p}" ${i < state.assembled ? 'disabled' : ''}>${icon(p)}${partNames[p]}</button>`).join('')}</div></div>`;
    bottom = dialogue('Bắp · Thợ phụ mê cà rốt', 'Cải là kỹ sư trưởng! Còn Bắp là… kỹ sư ăn trưa. Mình thử từng món một nhé.');
  }
  if (state.stage === 3) {
    sceneExtra = `<div class="workshop"><span class="eyebrow">MỘT NHỊP BÌNH TĨNH</span><h2>Chưa chạy cũng không sao.</h2><p>Cùng Bủm thở chậm một chút, rồi thử tiếp nhé.</p><div class="breathing-orb" id="breath-orb">Sẵn sàng?</div><div class="breath-actions"><button class="secondary" data-action="breathe">${icon('leaf')}Cùng thở nào</button><button class="primary" data-action="calm">Mình sẵn sàng</button></div></div>`;
    bottom = dialogue('Cải · Hơi sốt ruột một xíu', 'Sao xe chưa chạy nhỉ? Cải hơi bực rồi… Mình nghỉ một nhịp. Để Cải thử lại!');
  }
  if (state.stage === 4) {
    sceneExtra = `<div class="workshop"><span class="eyebrow">PHÒNG THÍ NGHIỆM BỦM</span><h2>Gió sẽ làm món nào quay?</h2><p>Chọn một món để nhận luồng gió từ Bủm.</p><div class="part-options">${[['horn','Cái còi'],['fan','Cánh quạt'],['rock','Viên đá']].map(([p,t])=>`<button class="part-option" data-action="experiment" data-choice="${p}">${icon(p)}${t}</button>`).join('')}</div></div>`;
    bottom = dialogue('Sâu Bủm · Người bạn mới', 'Tớ không có pin… nhưng tớ có gió! Bủm bé thôi nhé. Cải chọn giúp tớ món đón gió nào!');
  }
  main.innerHTML = `<div class="game-top"><div class="game-title"><small>CUỘC PHIÊU LƯU 01</small><h1>Bí mật khu vườn tí hon</h1></div><div class="stage-track" aria-label="Chặng ${state.stage+1} trên 6">${Array.from({length:6},(_,i)=>`<span class="stage-dot ${i < state.stage ? 'done' : i === state.stage ? 'current' : ''}"></span>`).join('')}</div><div class="game-controls"><button class="secondary" data-action="pause">${icon('pause')}Tạm nghỉ</button><button class="secondary" data-action="hint">${icon('help')}Gợi ý</button></div></div><section class="scene" aria-label="Khu vườn tí hon có Cải, Bắp và Sâu Bủm"><div class="mission">${icon('flag')}${mission}</div>${sceneExtra}</section>${bottom}<div class="game-bottom"><span>${icon('leaf')}Cứ thử nhé, không có câu trả lời đáng xấu hổ.</span><button data-action="bum">${icon('sparkle')}Một chiếc bủm vui</button></div>`;
}
function renderEnd() {
  currentLine = 'Sâu Bủm. Xe chạy rồi! Cảm ơn Cải vì đã thử lại và giúp tớ. Mình là bạn nhé!';
  main.innerHTML = `<section class="completion"><small>CUỘC PHIÊU LƯU 01 · HOÀN THÀNH</small><h1>Một chiếc xe đã chạy.<br>Một tình bạn bắt đầu!</h1><p>“Cảm ơn Cải! Tớ cứ tưởng chẳng ai muốn chơi với một bạn hay bủm…”<br>Cải cười: “Có chứ! Lần sau nhớ báo trước nhé!”</p><img class="end-image" src="assets/garden-adventure.png" alt="Cải, Bắp và Sâu Bủm trở thành bạn trong khu vườn">${medals()}<div class="real-world"><b>${icon('leaf')} Phiêu lưu tiếp, ở ngoài màn hình!</b>Cùng bố mẹ thổi một chiếc chong chóng giấy nhé.<br>Thử thổi nhẹ, rồi mạnh hơn. Cải thấy điều gì thay đổi?</div><div class="completion-actions"><button class="primary green" data-action="journal">${icon('book')}Cất vào sổ khám phá</button><button class="secondary" data-action="home">${icon('back')}Về trang đầu</button></div></section>`;
}
function showModal(content) { lastFocused = document.activeElement; modal.querySelector('.modal-inner').innerHTML = `<button class="modal-close" data-action="close" aria-label="Đóng">×</button>${content}`; if (!modal.open) modal.showModal(); }
function parents() { showModal(`<span class="eyebrow">${icon('people')} CÙNG CON LỚN LÊN</span><h2 id="modal-title">Gửi bố mẹ của Cải</h2><p>Đây là bản chơi thử một câu chuyện ngắn. Bố mẹ có thể ngồi cạnh, đọc lời thoại và hỏi: “Con muốn thử cách nào?”. Cải không cần biết đọc để chơi cùng bố mẹ.</p><div class="parent-row"><span>Âm thanh vui<small>Hiệu ứng nhặt đồ, lắp xe và bủm.</small></span><button class="secondary" data-action="parent-sound">${icon(state.sound ? 'sound' : 'mute')}${state.sound ? 'Đang bật' : 'Đang tắt'}</button></div><div class="parent-row"><span>Đọc tiếng Việt<small>Nút loa bên lời thoại. Cần giọng Việt trên thiết bị;<br>nếu chưa có, bố mẹ cùng đọc với Cải.</small></span>${icon('sound')}</div><div class="parent-row"><span>Tiến độ của Cải<small>Lưu trên trình duyệt này, không cần tài khoản.<br>Đã nhận ${stamps(state).filter(Boolean).length}/3 dấu khám phá.</small></span><button class="secondary" data-action="reset-confirm">Chơi từ đầu</button></div><p>Không giới hạn thời gian, không mất mạng, không quảng cáo. Tập 2 và 3 hiện là ý tưởng. Kết thúc tập, cùng con làm một thí nghiệm nhỏ ngoài đời nhé.</p><button class="primary green" data-action="close">Mình hiểu rồi ${icon('heart')}</button>`); }
function hint() {
  if (state.completed) { toast('Xe đã chạy rồi! Bấm “Hoan hô, cả đội!” để xem kỷ niệm của Cải.'); return; }
  const messages = ['Bấm “Mình giúp bạn!” để bắt đầu tìm đồ cùng Cải.', 'Tìm những món đồ trong vòng tròn vàng. Cải có thể chạm hoặc dùng phím Tab rồi Enter.', ['Bánh xe tròn giúp chiếc xe lăn. Thử chọn bánh xe nhé!', 'Bánh răng có những chiếc răng khớp nhau để truyền chuyển động.', 'Chiếc lá rộng có thể đón gió. Mình lắp lá làm cánh quạt nhé!'][state.assembled], 'Bấm “Cùng thở nào” để thở theo vòng tròn, hoặc “Mình sẵn sàng” để đi tiếp.', 'Gió làm cánh quạt quay. Hãy chọn cánh quạt nhé!'][state.stage];
  showModal(`<span class="eyebrow">${icon('help')} BẮP CÓ MỘT GỢI Ý</span><h2 id="modal-title">Mình thử thế này nhé!</h2><p>${messages}</p><button class="primary" data-action="close">Để Cải thử lại! ${icon('arrow')}</button>`);
  if (state.stage === 1) document.querySelector('.hotspot')?.classList.add('hint');
}
function feedback(text) { currentLine = text; const line = document.querySelector('#story-line'); if (line) line.textContent = text; }
function playBum() {
  if (Date.now()-soundAt < 1300) return;
  soundAt = Date.now(); sound('bum');
  const el = document.createElement('span'); el.className = 'puff'; el.textContent = 'BỦM!'; document.querySelector('.scene')?.append(el); setTimeout(()=>el.remove(),1400);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-action]'); if (!b || b.disabled) return;
  const a = b.dataset.action;
  if (a === 'home' || a === 'journal') navigate(a);
  else if (a === 'play') {
    if (state.completed) { showModal(`<h2 id="modal-title">Một cuộc phiêu lưu mới?</h2><p>Cải đã khám phá xong tập này. Chơi lại sẽ bắt đầu một lượt mới và đặt lại ba dấu khám phá.</p><div class="modal-actions"><button class="primary" data-action="reset">${icon('repeat')}Chơi lại từ đầu</button><button class="secondary" data-action="close">Giữ kỷ niệm này</button></div>`); }
    else navigate('game');
  }
  else if (a === 'begin') { apply({type:'start'}); sound(); renderGame(); }
  else if (a === 'collect') { apply({type:'collect',part:b.dataset.part}); sound(); renderGame(); toast(`Đã nhặt ${partNames[b.dataset.part].toLowerCase()}! ${state.collected.length}/3 món rồi.`); if (state.collected.length === 3) document.querySelector('[data-action="workshop"]')?.focus(); }
  else if (a === 'workshop') { apply({type:'workshop'}); renderGame(); }
  else if (a === 'assemble') {
    if (b.dataset.part !== PARTS[state.assembled]) { feedback(['Món này có ích đấy! Nhưng mình cần một món tròn để xe lăn trước nhé.', 'Mình tìm món có những chiếc răng nhỏ khớp nhau nhé!', 'Mình cần một món rộng và nhẹ để đón gió. Chiếc lá thì sao?'][state.assembled]); return; }
    apply({type:'assemble',part:b.dataset.part}); sound(); renderGame();
    if (state.stage === 2) feedback('Khớp rồi! Cải làm được này. Mình lắp tiếp nhé!');
  }
  else if (a === 'breathe') {
    if (breathTimer) { clearInterval(breathTimer); breathTimer = null; document.querySelector('#breath-orb')?.classList.remove('running'); b.innerHTML = `${icon('leaf')}Cùng thở nào`; document.querySelector('#breath-orb').textContent = 'Nghỉ một nhịp'; return; }
    breathTick = 0; const orb = document.querySelector('#breath-orb'); orb.classList.add('running'); orb.textContent = 'Hít vào…'; b.innerHTML = `${icon('pause')}Dừng vòng thở`;
    breathTimer = setInterval(()=>{ breathTick++; const o = document.querySelector('#breath-orb'); if (o) o.textContent = breathTick % 2 ? 'Thở ra…' : 'Hít vào…'; },3000);
  }
  else if (a === 'calm') { cleanup(); apply({type:'calm'}); renderGame(); }
  else if (a === 'experiment') {
    if (b.dataset.choice !== 'fan') { feedback(b.dataset.choice === 'horn' ? 'Bíp bíp! Còi gọi được Bắp, nhưng chưa làm xe chạy. Món nào có cánh đón gió nhỉ?' : 'Viên đá nặng quá, Bủm thổi đỏ cả má! Mình thử món nhẹ có cánh nhé.'); sound('bum'); return; }
    apply({type:'experiment',choice:'fan'}); sound('bum');
    document.querySelector('.workshop').remove(); document.querySelector('.mission').textContent = 'Xe chạy rồi! Hạt giống về vườn thôi!';
    const wagon = document.createElement('span'); wagon.className = 'wagon'; wagon.textContent = '🛺'; wagon.setAttribute('aria-label','Chiếc xe đang chạy'); document.querySelector('.scene').append(wagon);
    document.querySelector('.dialogue').outerHTML = dialogue('Cải · Kỹ sư trưởng', 'Quay rồi! Gió đẩy cánh quạt, bánh răng truyền chuyển động, bánh xe lăn! Bủm ơi, mình làm được rồi!', 'finish', 'Hoan hô, cả đội!');
  }
  else if (a === 'finish') { sound('win'); navigate('game'); }
  else if (a === 'bum') playBum();
  else if (a === 'read') readLine();
  else if (a === 'hint') hint();
  else if (a === 'sound' || a === 'parent-sound') { state.sound = !state.sound; save(); if (!state.sound) { stopNarration(); if (audio) audio.suspend(); } else sound(); if (a === 'parent-sound') parents(); }
  else if (a === 'parents') parents();
  else if (a === 'pause') { cleanup(); const orb = document.querySelector('#breath-orb'); if (orb) { orb.classList.remove('running'); orb.textContent = 'Nghỉ một nhịp'; const breathButton = document.querySelector('[data-action="breathe"]'); breathButton.innerHTML = `${icon('leaf')}Cùng thở nào`; } showModal(`<span class="eyebrow">${icon('leaf')} MỘT CHÚT NGHỈ NGƠI</span><h2 id="modal-title">Bắp chờ Cải ở đây nhé!</h2><p>Tiến độ của Cải được giữ trong trình duyệt này khi trình duyệt cho phép lưu. Mình có thể nghỉ rồi quay lại.</p><div class="modal-actions"><button class="primary" data-action="close">${icon('play')}Chơi tiếp</button><button class="secondary" data-action="exit">Về trang đầu</button></div>`); }
  else if (a === 'exit') { modal.close(); navigate('home'); }
  else if (a === 'close') modal.close();
  else if (a === 'reset-confirm') showModal(`<h2 id="modal-title">Bắt đầu lại tập 1?</h2><p>Lượt chơi và ba dấu khám phá hiện tại sẽ được đặt lại trên trình duyệt này.</p><div class="modal-actions"><button class="primary" data-action="reset">Chơi từ đầu</button><button class="secondary" data-action="close">Giữ tiến độ</button></div>`);
  else if (a === 'reset') { const soundEnabled = state.sound; state = freshState(); state.sound = soundEnabled; save(); modal.close(); navigate('game'); }
});
modal.addEventListener('close', ()=>{ if (lastFocused?.isConnected) lastFocused.focus(); });
document.addEventListener('visibilitychange', ()=>{ if (document.hidden) { cleanup(); const orb = document.querySelector('#breath-orb'); if (orb) { orb.classList.remove('running'); orb.textContent = 'Nghỉ một nhịp'; const button = document.querySelector('[data-action="breathe"]'); if (button) button.innerHTML = `${icon('leaf')}Cùng thở nào`; } } });
render();
