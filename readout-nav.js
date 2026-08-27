(function () {
  var TRACKS = [
    { id: 'ai-at-un', label: 'AI at the UN', readouts: [
      { file: 'ai-sustdev-panel-public-2026-07.html', date: '2026-07-15', title: 'AI & the Future of Sustainable Development' }
    ]},
    { id: 'secretary-general', label: 'Secretary-General', readouts: [
      { file: 'sg-townhall-2026-07.html',          date: '2026-07-23', title: 'The Next Secretary-General — candidate town hall' },
      { file: 'sg-regional-dialogue-2026-08.html', date: '2026-08-03', title: 'Regional Dialogue on the Future Leadership of the United Nations' }
    ]},
    { id: 'security-council', label: 'Security Council', readouts: [
      { file: 'sudan-icc-briefing-2026-07.html', date: '2026-07-15', title: 'Darfur and the ICC — 10,197th meeting' }
    ]},
    { id: 'un-funding', label: 'UN Funding', readouts: [
      { file: 'un-funding-structured-dialogue-2026-08.html', date: '2026-08-24', title: 'UNDP/UNFPA/UNOPS — structured funding dialogue' },
      { file: 'un-funding-un80-2026-08.html',                date: '2026-08-25', title: 'UNDP/UNFPA/UNOPS — the two proposed mergers' },
      { file: 'un-funding-undp-2026-08.html',                date: '2026-08-26', title: 'UNDP — interactive dialogue with the Administrator' }
    ]},
    { id: 'un80', label: 'UN80', readouts: [
      { file: 'un80-briefing-2025-05.html', date: '2025-05-12', title: 'UN80 — SG launch briefing' },
      { file: 'un80-briefing-2025-09.html', date: '2025-09-16', title: 'UN80 — Working Group, round 2' },
      { file: 'un80-briefing-2026-07.html', date: '2026-07-29', title: 'UN80 — funding, results and peacebuilding' }
    ]}
  ];

  var NAV_CSS = '.readout-nav{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:.5rem;'
    + 'align-items:stretch;margin-bottom:.75rem}'
    + '.readout-nav a,.readout-nav span{display:flex;flex-direction:column;justify-content:center;'
    + 'background:var(--surface);border:1px solid var(--rule);border-radius:var(--radius);'
    + 'padding:.4rem .75rem;font:inherit;font-size:.88rem;color:var(--ink);'
    + 'text-decoration:none;line-height:1.25}'
    + '.readout-nav a:hover{background:var(--bg)}'
    + '.readout-nav .rn-sub{font-size:.76rem;color:var(--muted)}'
    + '.readout-nav .rn-off{opacity:.45}'
    + '.readout-nav .rn-next{margin-left:auto}'
    + '@media (max-width:700px){.readout-nav .rn-next{margin-left:0}'
    + '.readout-nav a,.readout-nav span{flex:1 1 auto}}';

  function findCurrent() {
    var file = decodeURI(location.pathname.split('/').pop());
    for (var t = 0; t < TRACKS.length; t++) {
      var track = TRACKS[t];
      var readouts = track.readouts.slice().sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      for (var i = 0; i < readouts.length; i++) {
        if (readouts[i].file === file) {
          return { track: track, readouts: readouts, index: i };
        }
      }
    }
    return null;
  }

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html) e.innerHTML = html;
    return e;
  }

  function buildButton(kind, target, subText, offLabel) {
    if (!target) {
      var span = el('span', 'rn-off');
      span.setAttribute('aria-disabled', 'true');
      span.innerHTML = (kind === 'prev' ? '← Older readout' : 'Newer readout →')
        + '<span class="rn-sub">' + offLabel + '</span>';
      if (kind === 'next') span.className += ' rn-next';
      return span;
    }
    var a = el('a', kind === 'next' ? 'rn-next' : '');
    a.href = target.file;
    a.innerHTML = (kind === 'prev' ? '← Older readout' : 'Newer readout →')
      + '<span class="rn-sub">' + subText + '</span>';
    return a;
  }

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function render() {
    var current = findCurrent();
    if (!current) return;

    var header = document.querySelector('.shell > header.page');
    if (!header) return;

    var style = document.createElement('style');
    style.textContent = NAV_CSS;
    document.head.appendChild(style);

    var nav = el('nav', 'readout-nav');
    nav.setAttribute('aria-label', 'Readout navigation');

    var mainLink = el('a', '', '← Main page<span class="rn-sub">' + current.track.label + '</span>');
    mainLink.href = '../index.html#' + current.track.id;
    nav.appendChild(mainLink);

    var prevTarget = current.index > 0 ? current.readouts[current.index - 1] : null;
    nav.appendChild(buildButton('prev', prevTarget, prevTarget ? formatDate(prevTarget.date) : '', 'oldest in track'));

    var nextTarget = current.index < current.readouts.length - 1 ? current.readouts[current.index + 1] : null;
    nav.appendChild(buildButton('next', nextTarget, nextTarget ? formatDate(nextTarget.date) : '', 'newest in track'));

    header.after(nav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
