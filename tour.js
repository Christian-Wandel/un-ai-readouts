/* First-visit guided tour: up to five spotlit steps, then never again on this site
   (one localStorage flag shared by every readout; the index page has a 3-step guide under
   its own flag). Ported from the Beyond GDP Denmark v2
   tour, which is the cv-chat tour. The ring is one element doing two jobs: a transparent
   hole over the target, plus a huge box-shadow spread that dims the rest of the page.
   The markup is built on start and removed on end, so edit-mode exports never carry it. */
(function () {
  var SEEN_KEY = 'un-readouts-tour-seen';

  var TOUR_CSS = '.rt-tour{position:fixed;inset:0;z-index:9990}'
    + '.rt-ring{position:fixed;border-radius:var(--radius,10px);'
    + 'box-shadow:0 0 0 9999px rgba(10,12,16,.58);pointer-events:none;z-index:9991;'
    + 'transition:top .25s ease,left .25s ease,width .25s ease,height .25s ease}'
    + '.rt-card{position:fixed;z-index:9992;width:min(320px,calc(100vw - 32px));box-sizing:border-box;'
    + 'padding:18px 20px 16px;background:var(--surface,#fff);color:var(--ink,#1a1c20);'
    + 'border:1px solid var(--rule,#e3e1da);border-radius:var(--radius,10px);'
    + 'box-shadow:0 8px 28px rgba(10,12,16,.18);transition:top .25s ease,left .25s ease;font:inherit}'
    + '.rt-close{position:absolute;top:8px;right:10px;border:none;background:none;'
    + 'color:var(--muted,#5b6470);font-size:20px;line-height:1;padding:4px;cursor:pointer}'
    + '.rt-close:hover{color:var(--ink,#1a1c20)}'
    + '.rt-step{margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:.06em;'
    + 'text-transform:uppercase;color:var(--muted,#5b6470)}'
    + '.rt-title{margin:0 0 6px;font-size:16px;font-weight:600;line-height:1.3;color:var(--ink,#1a1c20)}'
    + '.rt-body{margin:0 0 14px;font-size:13.5px;line-height:1.55;color:var(--ink,#1a1c20)}'
    + '.rt-actions{display:flex;align-items:center;justify-content:space-between;gap:10px}'
    + '.rt-skip,.rt-next{font:inherit;font-size:13px;border-radius:8px;padding:7px 14px;cursor:pointer}'
    + '.rt-skip{border:none;background:none;color:var(--muted,#5b6470);padding-left:0}'
    + '.rt-skip:hover{color:var(--ink,#1a1c20)}'
    + '.rt-next{border:1px solid var(--ink,#1a1c20);background:var(--ink,#1a1c20);'
    + 'color:var(--surface,#fff);font-weight:600}'
    + '.rt-next:hover{opacity:.88}'
    + '.rt-skip:focus-visible,.rt-next:focus-visible,.rt-close:focus-visible'
    + '{outline:2px solid var(--ink,#1a1c20);outline-offset:2px}'
    + '@media (prefers-reduced-motion:reduce){.rt-ring,.rt-card{transition:none}}'
    + '@media print{.rt-tour{display:none!important}}';

  var STR = {
    skip: 'Skip', next: 'Next', done: 'Got it', close: 'Close the guide',
    stepOf: function (n, total) { return 'Step ' + n + ' of ' + total; }
  };

  var tour, ring, card, stepEl, titleEl, bodyEl, skipBtn, nextBtn, closeBtn;
  var steps = [], idx = 0, active = false, prevScroll = '', seenKey = SEEN_KEY;

  // The index page gets its own short guide, remembered under its own flag.
  var INDEX_KEY = 'un-readouts-index-guide-seen';

  function buildIndexSteps() {
    var header = document.querySelector('header.page');
    return [
      { el: header && header.querySelector('h1'), to: header && header.querySelector('.lede'),
        title: 'What this site is',
        body: 'Short readouts of UN meetings. Each one shows what was proposed, where the speakers agree, and where they differ.' },
      { el: document.querySelector('details.group > summary'), title: 'Pick a topic',
        body: 'The readouts are grouped by topic, A to Z. Click a topic to open it, then click a card to read that readout.' },
      { el: document.querySelector('header.page .asr-note'), title: 'Know the source',
        body: 'The readouts are built from the UN’s automatic transcripts, not the official record. Each readout links to its source and to how it was made.' }
    ].filter(function (s) { return s.el; });
  }

  function buildSteps() {
    var expand = document.getElementById('expand-all');
    // On a phone the header can be taller than the screen; spotlight the title alone then.
    var header = document.querySelector('header.page');
    if (header && header.offsetHeight > window.innerHeight * 0.6) header = header.querySelector('h1') || header;
    return [
      { el: header, title: 'What this page is',
        body: 'A readout of one UN meeting: what was proposed, where the speakers agree, and where they differ. The meeting, its date and who spoke are listed here, with a link to how the readout was made.' },
      { el: document.getElementById('toc'), title: 'Read the top two first',
        body: 'The first two sections give the main reading of the meeting in 2 to 5 minutes. Use this list to jump to any section.' },
      { el: expand && (expand.closest('.control-group') || expand), title: 'Open the detail',
        body: 'The other sections start closed. Click a section title to open it, or use Expand all.' },
      { el: document.querySelector('#plot > details > summary'), title: 'See who stands where',
        body: 'The plot groups the delegations by position, so you can see which ones cluster together.' },
      { el: document.querySelector('#reference > details > summary'), title: 'Find one delegation',
        body: 'Open this section to search or filter the stance of every delegation, in its own words.' }
    ].filter(function (s) { return s.el; });
  }

  function el(tag, className, attrs) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    return e;
  }

  function build() {
    var style = el('style');
    style.id = 'rt-style';
    style.textContent = TOUR_CSS;
    document.head.appendChild(style);

    tour = el('div', 'rt-tour');
    ring = el('div', 'rt-ring');
    card = el('div', 'rt-card', { role: 'dialog', 'aria-modal': 'true',
      'aria-labelledby': 'rt-title', 'aria-describedby': 'rt-body' });
    closeBtn = el('button', 'rt-close', { type: 'button', 'aria-label': STR.close });
    closeBtn.innerHTML = '&times;';
    stepEl = el('p', 'rt-step');
    titleEl = el('h2', 'rt-title', { id: 'rt-title' });
    bodyEl = el('p', 'rt-body', { id: 'rt-body' });
    var actions = el('div', 'rt-actions');
    skipBtn = el('button', 'rt-skip', { type: 'button' });
    skipBtn.textContent = STR.skip;
    nextBtn = el('button', 'rt-next', { type: 'button' });
    actions.appendChild(skipBtn);
    actions.appendChild(nextBtn);
    card.appendChild(closeBtn);
    card.appendChild(stepEl);
    card.appendChild(titleEl);
    card.appendChild(bodyEl);
    card.appendChild(actions);
    tour.appendChild(ring);
    tour.appendChild(card);
    document.body.appendChild(tour);

    nextBtn.addEventListener('click', next);
    skipBtn.addEventListener('click', end);
    closeBtn.addEventListener('click', end);
    // Clicking the dimmed area dismisses; clicks on the card itself must not.
    tour.addEventListener('click', function (e) { if (e.target === tour) end(); });
  }

  function place() {
    var step = steps[idx];
    if (!step) return;
    var pad = 6;
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var r = step.el.getBoundingClientRect();
    // A step with `to` spotlights the span from its element down to that second one.
    if (step.to) {
      var r2 = step.to.getBoundingClientRect();
      r = { top: Math.min(r.top, r2.top), left: Math.min(r.left, r2.left),
        width: Math.max(r.right, r2.right) - Math.min(r.left, r2.left),
        height: Math.max(r.bottom, r2.bottom) - Math.min(r.top, r2.top) };
    }

    var top = r.top - pad, left = r.left - pad;
    var w = Math.min(r.width + pad * 2, vw), h = Math.min(r.height + pad * 2, vh);
    // Clamp so a target that does not fit keeps the hole on-screen.
    left = Math.max(0, Math.min(left, vw - w));
    top = Math.max(0, Math.min(top, vh - h));
    ring.style.top = top + 'px';
    ring.style.left = left + 'px';
    ring.style.width = w + 'px';
    ring.style.height = h + 'px';

    // Card below the target when there is room, otherwise above; then clamped to the viewport.
    var gap = 14, cw = card.offsetWidth, ch = card.offsetHeight;
    var cTop = top + h + gap;
    if (cTop + ch > vh - 12) cTop = top - ch - gap;
    cTop = Math.max(12, Math.min(cTop, vh - ch - 12));
    var cLeft = Math.max(12, Math.min(left + w / 2 - cw / 2, vw - cw - 12));
    card.style.top = cTop + 'px';
    card.style.left = cLeft + 'px';
  }

  function render() {
    var step = steps[idx];
    if (!step) return;
    var last = idx === steps.length - 1;
    stepEl.textContent = STR.stepOf(idx + 1, steps.length);
    titleEl.textContent = step.title;
    bodyEl.textContent = step.body;
    nextBtn.textContent = last ? STR.done : STR.next;

    // Bring an off-screen target into view before measuring.
    var r = step.el.getBoundingClientRect();
    var vh = document.documentElement.clientHeight;
    if (r.top < 0 || r.bottom > vh) step.el.scrollIntoView({ block: 'center' });

    place();
    // Re-place once the card has its final height for this step's text.
    requestAnimationFrame(place);
  }

  function end() {
    if (!active) return;
    active = false;
    try { localStorage.setItem(seenKey, '1'); } catch (e) { /* private mode: shows again next visit */ }
    document.removeEventListener('keydown', onKey, true);
    window.removeEventListener('resize', place);
    window.removeEventListener('scroll', place);
    tour.parentNode.removeChild(tour);
    var style = document.getElementById('rt-style');
    if (style) style.parentNode.removeChild(style);
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = prevScroll;
  }

  function next() {
    if (idx >= steps.length - 1) { end(); return; }
    idx++;
    render();
    nextBtn.focus();
  }

  function onKey(e) {
    if (!active) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); end(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  }

  function start() {
    var isReadout = !!document.getElementById('toc');
    var isIndex = !isReadout && !!document.querySelector('details.group');
    if (!isReadout && !isIndex) return;
    seenKey = isReadout ? SEEN_KEY : INDEX_KEY;
    try {
      if (localStorage.getItem(seenKey)) return;
    } catch (e) {
      return; // no storage, no way to remember a dismissal: don't nag
    }
    steps = isReadout ? buildSteps() : buildIndexSteps();
    if (!steps.length) return;
    build();
    // The readouts scroll smoothly; the ring must measure after the scroll, not during it.
    prevScroll = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    idx = 0;
    active = true;
    render();
    nextBtn.focus();
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
