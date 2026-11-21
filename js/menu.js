(function () {
  var btn = document.getElementById('menu-toggle');
  var panel = document.getElementById('mobile-menu');
  var sheet = document.querySelector('.sheet');
  var code = document.querySelector('.m-head-code');
  var label = btn ? btn.querySelector('.menu-toggle-label') : null;
  var icon = btn ? btn.querySelector('.menu-toggle-icon') : null;
  if (!btn || !panel) return;

  function pageCode() {
    if (!code) return '';
    if (!code.textContent) return code.textContent;
    if (code.textContent === 'MENU') return code.getAttribute('data-code') || '';
    return code.textContent;
  }

  function open() {
    if (code) {
      code.setAttribute('data-code', code.textContent);
      code.textContent = 'MENU';
    }
    if (label) label.textContent = 'CLOSE';
    if (icon) icon.textContent = '×';
    btn.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    if (sheet) sheet.setAttribute('inert', '');
    document.body.classList.add('menu-open');
    var first = panel.querySelector('a');
    if (first) first.focus();
  }

  function close() {
    if (code) code.textContent = pageCode();
    if (label) label.textContent = 'MENU';
    if (icon) icon.textContent = '≡';
    btn.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    panel.classList.add('is-closing');
    if (sheet) sheet.removeAttribute('inert');
    document.body.classList.remove('menu-open');
    btn.focus();
    window.setTimeout(function () {
      panel.classList.remove('is-closing');
    }, 520);
  }

  btn.addEventListener('click', function () {
    if (panel.classList.contains('is-open')) close();
    else open();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
  });

  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      if (sheet) sheet.removeAttribute('inert');
      document.body.classList.remove('menu-open');
      panel.classList.remove('is-open');
      panel.classList.remove('is-closing');
      btn.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'MENU';
      if (icon) icon.textContent = '≡';
    }
  });
})();

// ── 目次などのページ内リンク: コマ送りスクロール（1コマ 83ms × 6、滑らかな変化は使わない） ──
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FRAME = 83;
  var FRAMES = 6;

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return; // 対応する見出しがないものは既定の挙動に任せる
      e.preventDefault();
      var start = window.scrollY;
      var end = start + target.getBoundingClientRect().top;
      var i = 0;
      var tick = function () {
        i += 1;
        window.scrollTo(0, start + ((end - start) * i) / FRAMES);
        if (i < FRAMES) {
          window.setTimeout(tick, FRAME);
        } else {
          history.pushState(null, '', '#' + id);
        }
      };
      if (reduced || start === end) {
        window.scrollTo(0, end);
        history.pushState(null, '', '#' + id);
      } else {
        tick();
      }
    });
  });
})();
