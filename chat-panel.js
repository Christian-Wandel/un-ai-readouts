// Per-track source-grounded chat panel. Vanilla JS, no build step, matches
// every readout + the index page via .chat-btn[data-track] triggers and a
// shared #chat-panel-root mount point.
(function () {
  "use strict";

  // TODO after first `wrangler pages deploy`: replace with the real URL,
  // e.g. "https://un-readouts-chat.pages.dev".
  var CHAT_API_BASE = "https://un-readouts-chat.pages.dev";

  var TRACK_LABELS = { "un-funding": "UN Funding" };
  var EXAMPLES = {
    "un-funding": [
      "What funding figures did delegates bring up for their own countries?",
      "What did the United States argue about core funding?",
      "What did UNDP's Chief Financial Officer say about management discretion?",
    ],
  };

  var state = {
    root: null,
    track: null,
    sessionId: null,
    accessCode: null,
    history: [], // [{role, content}]
    sending: false,
  };

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isTableRow(t) {
    return t.indexOf("|") !== -1 && t.trim().charAt(0) === "|";
  }
  function isTableSeparator(t) {
    return /^\|[\s:|-]+\|$/.test(t.trim());
  }
  function splitTableRow(t) {
    var s = t.trim();
    if (s.charAt(0) === "|") s = s.slice(1);
    if (s.charAt(s.length - 1) === "|") s = s.slice(0, -1);
    return s.split("|").map(function (c) { return c.trim(); });
  }

  // Minimal markdown: **bold**, paragraphs on blank lines, "- " bullet lists,
  // pipe tables (header row + separator row + body rows).
  function renderMarkdown(text) {
    var lines = text.split("\n");
    var html = "";
    var inList = false;
    var para = [];
    function flushPara() {
      if (para.length) {
        html += "<p>" + para.join(" ") + "</p>";
        para = [];
      }
    }
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];
      var t = line.trim();
      if (isTableRow(t) && isTableSeparator((lines[i + 1] || "").trim())) {
        flushPara();
        if (inList) { html += "</ul>"; inList = false; }
        var headerCells = splitTableRow(t);
        html += '<div class="cp-table-wrap"><table><thead><tr>';
        headerCells.forEach(function (c) { html += "<th>" + inlineMd(c) + "</th>"; });
        html += "</tr></thead><tbody>";
        i += 2;
        while (i < lines.length && isTableRow(lines[i].trim())) {
          var cells = splitTableRow(lines[i].trim());
          html += "<tr>";
          cells.forEach(function (c) { html += "<td>" + inlineMd(c) + "</td>"; });
          html += "</tr>";
          i++;
        }
        html += "</tbody></table></div>";
        continue;
      }
      if (t.startsWith("- ")) {
        flushPara();
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += "<li>" + inlineMd(t.slice(2)) + "</li>";
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        if (t === "") {
          flushPara();
        } else {
          para.push(inlineMd(t));
        }
      }
      i++;
    }
    if (inList) html += "</ul>";
    flushPara();
    return html;
  }

  function inlineMd(t) {
    var esc = escapeHtml(t);
    esc = esc.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    esc = esc.replace(/\[(\d+)\]/g, function (m, n) {
      return '<button class="cp-chip" data-chip="' + n + '">' + n + "</button>";
    });
    return esc;
  }

  function autosizeInput() {
    var el = document.getElementById("cp-input");
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  function ensurePanel() {
    if (state.root) return state.root;
    var root = document.getElementById("chat-panel-root");
    root.innerHTML =
      '<div class="cp-header">' +
      '<div><h2 id="cp-title">Chat</h2><p id="cp-subtitle"></p></div>' +
      '<button class="cp-close" id="cp-close" aria-label="Close chat">×</button>' +
      "</div>" +
      '<div class="cp-body" id="cp-body">' +
      '<div class="cp-empty" id="cp-empty"></div>' +
      "</div>" +
      '<div class="cp-gate" id="cp-gate" style="display:none">' +
      "<p>This chat needs an access code.</p>" +
      '<div class="cp-gate-row"><input type="text" id="cp-code-input" placeholder="Access code" autocomplete="off">' +
      '<button id="cp-code-submit">Unlock</button></div>' +
      '<div class="cp-gate-error" id="cp-gate-error" style="display:none"></div>' +
      "</div>" +
      '<div class="cp-input-area" id="cp-input-area" style="display:none">' +
      '<div class="cp-input-row"><textarea id="cp-input" rows="1" placeholder="Ask a question…" autocomplete="off" maxlength="1000"></textarea>' +
      '<button id="cp-send">Send</button></div>' +
      '<p class="cp-hint">Answers are grounded in this track\'s readouts and transcripts only.</p>' +
      "</div>";
    state.root = root;

    document.getElementById("cp-close").addEventListener("click", closePanel);
    document.getElementById("cp-code-submit").addEventListener("click", submitCode);
    document.getElementById("cp-code-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") submitCode();
    });
    document.getElementById("cp-send").addEventListener("click", sendMessage);
    document.getElementById("cp-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey && !state.sending) {
        e.preventDefault();
        sendMessage();
      }
    });
    document.getElementById("cp-input").addEventListener("input", autosizeInput);
    document.getElementById("cp-body").addEventListener("click", function (e) {
      var chip = e.target.closest(".cp-chip");
      if (chip) toggleSourceCard(chip);
    });

    return root;
  }

  function openPanel(track) {
    ensurePanel();
    state.track = track;
    document.getElementById("cp-title").textContent = "Chat: " + (TRACK_LABELS[track] || track);
    document.getElementById("cp-subtitle").textContent = "Grounded in this track's readouts and transcripts";
    renderEmptyState();

    var savedCode = localStorage.getItem("un-chat-access-code");
    if (savedCode) {
      state.accessCode = savedCode;
      showComposer();
    } else {
      showGate();
    }

    state.root.classList.add("open");
    document.body.classList.add("chat-open");
    if (state.accessCode) document.getElementById("cp-input").focus();
  }

  function closePanel() {
    if (!state.root) return;
    state.root.classList.remove("open");
    document.body.classList.remove("chat-open");
  }

  function renderEmptyState() {
    var body = document.getElementById("cp-body");
    var msgs = body.querySelectorAll(".cp-msg");
    msgs.forEach(function (m) { m.remove(); });
    var empty = document.getElementById("cp-empty");
    if (state.history.length) {
      empty.style.display = "none";
      return;
    }
    var examples = EXAMPLES[state.track] || [];
    empty.style.display = "";
    empty.innerHTML =
      "<p>Ask a question about this track's meetings. Answers cite the transcript or readout behind every claim.</p>" +
      (examples.length
        ? '<ul class="ex">' + examples.map(function (e) { return "<li>" + escapeHtml(e) + "</li>"; }).join("") + "</ul>"
        : "");
  }

  function showGate() {
    document.getElementById("cp-gate").style.display = "";
    document.getElementById("cp-input-area").style.display = "none";
  }

  function showComposer() {
    document.getElementById("cp-gate").style.display = "none";
    document.getElementById("cp-input-area").style.display = "";
  }

  function submitCode() {
    var input = document.getElementById("cp-code-input");
    var code = input.value.trim();
    var errEl = document.getElementById("cp-gate-error");
    errEl.style.display = "none";
    if (!code) return;

    fetch(CHAT_API_BASE + "/api/validate-code?code=" + encodeURIComponent(code))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.valid) {
          state.accessCode = code;
          localStorage.setItem("un-chat-access-code", code);
          showComposer();
          document.getElementById("cp-input").focus();
        } else {
          errEl.textContent = "That code isn't valid.";
          errEl.style.display = "";
        }
      })
      .catch(function () {
        errEl.textContent = "Could not reach the chat service. Try again shortly.";
        errEl.style.display = "";
      });
  }

  function addBanner(text) {
    var body = document.getElementById("cp-body");
    var el = document.createElement("div");
    el.className = "cp-error-banner";
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function sendMessage() {
    var input = document.getElementById("cp-input");
    var message = input.value.trim();
    if (!message || !state.accessCode || state.sending) return;
    input.value = "";
    autosizeInput();
    state.sending = true;
    document.getElementById("cp-send").disabled = true;

    var body = document.getElementById("cp-body");
    document.getElementById("cp-empty").style.display = "none";

    var userMsg = document.createElement("div");
    userMsg.className = "cp-msg user";
    userMsg.innerHTML = '<div class="cp-bubble"></div>';
    userMsg.querySelector(".cp-bubble").textContent = message;
    body.appendChild(userMsg);

    var assistantMsg = document.createElement("div");
    assistantMsg.className = "cp-msg assistant";
    assistantMsg.innerHTML = '<div class="cp-bubble"><span class="cp-typing">Thinking…</span></div>';
    body.appendChild(assistantMsg);
    body.scrollTop = body.scrollHeight;

    if (!state.sessionId) {
      state.sessionId = localStorage.getItem("un-chat-session-" + state.track) || uuid();
      localStorage.setItem("un-chat-session-" + state.track, state.sessionId);
    }

    var citations = []; // {n, speaker, affiliation, source, quote, url}
    var assistantText = "";
    var bubble = assistantMsg.querySelector(".cp-bubble");
    var firstChunk = true;

    fetch(CHAT_API_BASE + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        sessionId: state.sessionId,
        history: state.history,
        accessCode: state.accessCode,
        track: state.track,
      }),
    })
      .then(function (res) {
        if (!res.ok) {
          return res.json().then(function (err) {
            throw new Error(err.error || "Request failed");
          });
        }
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buffer = "";

        function pump() {
          return reader.read().then(function (result) {
            if (result.done) {
              if (buffer.trim()) handleLine(buffer);
              finalize();
              return;
            }
            buffer += decoder.decode(result.value, { stream: true });
            var lines = buffer.split("\n");
            buffer = lines.pop();
            lines.forEach(handleLine);
            return pump();
          });
        }

        function handleLine(line) {
          if (!line.trim()) return;
          var evt;
          try {
            evt = JSON.parse(line);
          } catch (e) {
            return;
          }
          if (evt.type === "text") {
            if (firstChunk) {
              bubble.innerHTML = "";
              firstChunk = false;
            }
            assistantText += evt.content;
            bubble.innerHTML = renderMarkdown(assistantText);
            body.scrollTop = body.scrollHeight;
          } else if (evt.type === "citation") {
            if (evt.new) citations.push(evt);
          } else if (evt.type === "error") {
            addBanner(evt.error);
          }
        }

        return pump();
      })
      .then(function () {
        if (citations.length) renderSourceCards(assistantMsg, citations);
        state.history.push({ role: "user", content: message });
        state.history.push({ role: "assistant", content: assistantText });
        state.history = state.history.slice(-20);
      })
      .catch(function (e) {
        bubble.innerHTML = "";
        bubble.textContent = "Sorry, something went wrong: " + e.message;
      })
      .finally(function () {
        state.sending = false;
        document.getElementById("cp-send").disabled = false;
        body.scrollTop = body.scrollHeight;
      });

    function finalize() {
      if (firstChunk) bubble.innerHTML = "";
    }
  }

  function renderSourceCards(assistantMsg, citations) {
    var wrap = document.createElement("div");
    wrap.className = "cp-sources";
    citations.forEach(function (c) {
      var card = document.createElement("div");
      card.className = "cp-source-card";
      card.dataset.chipTarget = c.n;
      card.style.display = "none";
      var who = c.speaker
        ? '<span class="who">' + escapeHtml(c.speaker) + "</span>" +
          (c.affiliation ? ' <span class="aff">(' + escapeHtml(c.affiliation) + ")</span>" : "")
        : '<span class="who">' + escapeHtml(c.source || "Readout") + "</span>";
      card.innerHTML =
        "<div>[" + c.n + "] " + who + "</div>" +
        "<blockquote>" + escapeHtml(c.quote || "") + "</blockquote>" +
        '<a href="' + escapeHtml(c.url) + '" target="_blank" rel="noopener">Open source →</a>';
      wrap.appendChild(card);
    });
    assistantMsg.appendChild(wrap);
  }

  function toggleSourceCard(chip) {
    var n = chip.dataset.chip;
    var msg = chip.closest(".cp-msg");
    if (!msg) return;
    var card = msg.querySelector('.cp-source-card[data-chip-target="' + n + '"]');
    if (!card) return;
    var isOpen = card.style.display !== "none";
    msg.querySelectorAll(".cp-source-card").forEach(function (c) { c.style.display = "none"; });
    card.style.display = isOpen ? "none" : "";
    if (!isOpen) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".chat-btn[data-track]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openPanel(btn.dataset.track);
      });
    });
  });
})();
