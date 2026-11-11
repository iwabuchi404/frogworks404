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
