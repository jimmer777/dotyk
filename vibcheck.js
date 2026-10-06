// Vibration check gate. A web page cannot read the ringer mode, and Chrome on Android silently drops
// every vibration in Silent mode, so we buzz once and ask whether it was felt. "Yes" is remembered for 12 h.
// Fires `vibcheck:done` ({ ok }) on document; window.vibCheck() re-runs it.
(() => {
  const KEY = 'dotyk.vibcheck', TTL = 12 * 3600 * 1000;
  const canVibrate = 'vibrate' in navigator;
  const isTouch = matchMedia('(pointer: coarse)').matches;
  let root = null;

  const style = document.createElement('style');
  style.textContent = `
    .vc { position:fixed; inset:0; z-index:50; display:grid; place-items:center; padding:20px; background:rgba(8,8,10,.95);
      color:#f2f2f2; font:16px/1.45 system-ui, -apple-system, sans-serif; }
    .vc-card { width:min(420px, 100%); background:#1a1a1f; border-radius:18px; padding:22px 18px;
      display:flex; flex-direction:column; gap:12px; }
    .vc-ico { font-size:46px; text-align:center; line-height:1; }
    .vc h2 { margin:0; font-size:22px; text-align:center; }
    .vc p { margin:0; color:#d0d0d6; }
    .vc ol { margin:0; padding-left:20px; color:#d0d0d6; } .vc li { margin:6px 0; }
    .vc button { font:inherit; border:0; border-radius:12px; padding:14px; background:#2b2b33; color:#f2f2f2; }
    .vc button:active { transform:scale(.97); }
    .vc .vc-pri { background:#e8c26a; color:#111; font-weight:700; font-size:17px; padding:16px; }
    .vc .vc-link { background:none; color:#a3a3a8; text-decoration:underline; padding:6px; }
    .vc-ios { position:absolute; opacity:0; pointer-events:none; width:1px; height:1px; }`;
  document.head.append(style);

  const remembered = () => { try { return Date.now() - (+localStorage.getItem(KEY) || 0) < TTL; } catch { return false; } };
  const remember = () => { try { localStorage.setItem(KEY, String(Date.now())); } catch {} };
  const buzz = () => {
    if (canVibrate) navigator.vibrate([200, 120, 200]);
    else root.querySelector('.vc-ios').click(); // iOS 18+ Safari: toggling a switch gives a haptic tick
  };
  const step = html => { root.querySelector('.vc-card').innerHTML = html; };

  const screens = {
    intro: () => step(`<div class="vc-ico">📳</div><h2>Najpierw sprawdźmy wibrację</h2>
      <p>Wszystko tutaj czuć przez wibracje telefonu. W trybie <b>Wycisz</b> telefon ich nie odtworzy,
      a strona nie potrafi tego sprawdzić sama — dlatego pytamy Ciebie.</p>
      <button class="vc-pri" data-a="test">📳 Zawibruj teraz</button>`),
    ask: () => { buzz(); step(`<div class="vc-ico">🤔</div><h2>Poczułeś wibrację?</h2>
      <button class="vc-pri" data-a="yes">✅ Tak, czuję</button>
      <button data-a="no">❌ Nic nie czuję</button>
      <button class="vc-link" data-a="test">Zawibruj jeszcze raz</button>`); },
    help: () => step(`<div class="vc-ico">🔕</div><h2>Włącz wibracje</h2><ol>
        <li>Przeciągnij palcem od górnej krawędzi ekranu w dół.</li>
        <li>Stuknij ikonę dźwięku, aż pokaże <b>🔔 Dźwięk</b> albo <b>📳 Wibracja</b> — nie <b>🔇 Wycisz</b>.</li>
        <li>Dalej nic? Ustawienia → Dźwięki i wibracje → <b>Intensywność wibracji</b> (suwaki nie na zerze)
          i wyłącz <b>Nie przeszkadzać</b>.</li></ol>
      <button class="vc-pri" data-a="test">📳 Sprawdź ponownie</button>
      <button class="vc-link" data-a="skip">Pomiń — oglądam bez wibracji</button>`),
    iphone: () => step(`<div class="vc-ico">📱</div><h2>iPhone: tylko delikatny tyk</h2>
      <p>Safari nie daje stronom pełnej wibracji. Zadziała jedynie lekki tyk — włącz
      Ustawienia → Dźwięki i haptyka → <b>Haptyka systemowa</b>. Pełne wrażenia: telefon z Androidem.</p>
      <button class="vc-pri" data-a="test">Sprawdź tyk</button>
      <button class="vc-link" data-a="skip">Dalej</button>`),
    desktop: () => step(`<div class="vc-ico">💻</div><h2>Komputer nie wibruje</h2>
      <p>Otwórz tę stronę na telefonie z Androidem, żeby poczuć wibracje. Tutaj możesz tylko oglądać.</p>
      <button class="vc-pri" data-a="skip">Oglądam bez wibracji</button>`),
  };

  function close(ok) {
    if (ok) remember();
    root.remove(); root = null;
    document.dispatchEvent(new CustomEvent('vibcheck:done', { detail: { ok } }));
  }

  function open() {
    if (root) return;
    root = document.createElement('div');
    root.className = 'vc'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
    root.innerHTML = '<div class="vc-card"></div><label class="vc-ios"><input type="checkbox" switch></label>';
    root.addEventListener('click', e => {
      const a = e.target.closest('[data-a]')?.dataset.a;
      if (a === 'test') screens.ask();
      else if (a === 'yes') close(true);
      else if (a === 'no') screens.help();
      else if (a === 'skip') close(false);
    });
    document.body.append(root);
    (canVibrate ? screens.intro : isTouch ? screens.iphone : screens.desktop)();
  }

  window.vibCheck = open;
  if (!remembered()) open();
})();
