// Theme toggle: cycles System → Light → Dark. Preference is remembered per browser.
(function () {
  var root = document.documentElement;
  var order = ['system', 'light', 'dark'];
  var labels = { system: 'Theme: system (click for light)', light: 'Theme: light (click for dark)', dark: 'Theme: dark (click for system)' };
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function getPref() {
    try { return localStorage.getItem('theme') || 'system'; } catch (e) { return 'system'; }
  }
  function apply(pref) {
    var dark = pref === 'dark' || (pref === 'system' && media.matches);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.setAttribute('data-theme-pref', pref);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0B0D10' : '#E9EBEF');
    var btn = document.querySelector('.theme-btn');
    if (btn) btn.setAttribute('aria-label', labels[pref]);
  }

  apply(getPref());
  media.addEventListener('change', function () { if (getPref() === 'system') apply('system'); });

  document.addEventListener('DOMContentLoaded', function () {
    apply(getPref());
    var btn = document.querySelector('.theme-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = order[(order.indexOf(getPref()) + 1) % order.length];
      try { localStorage.setItem('theme', next); } catch (e) {}
      apply(next);
    });
  });
})();
