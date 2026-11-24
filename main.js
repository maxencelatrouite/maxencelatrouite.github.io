/* Renders the project list from projects.js, with filters and expandable rows. */
(function () {
  "use strict";

  var INITIAL = 6; // projects shown before "Show all"
  var list = document.getElementById("project-list");
  var filtersEl = document.getElementById("filters");
  var countEl = document.getElementById("project-count");
  var showAllBtn = document.getElementById("show-all");
  var active = "all";
  var expandedAll = false;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function icon() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "p-icon");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M12 5v14M5 12h14");
    svg.appendChild(path);
    return svg;
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function buildProject(p, index) {
    var detailId = "detail-" + p.id;
    var row = el("button", {
      type: "button",
      class: "project-row",
      "aria-expanded": "false",
      "aria-controls": detailId,
    }, [
      el("span", { class: "p-num", text: pad(index + 1) }),
      el("span", { class: "p-main" }, [
        el("span", { class: "p-title", text: p.title }),
        el("span", { class: "p-summary", text: p.summary }),
      ]),
      el("span", { class: "p-context", text: p.context }),
      el("span", { class: "p-date", text: p.date }),
      icon(),
    ]);

    var text = el("div", { class: "d-text" }, [
      el("ul", null, (p.details || []).map(function (d) { return el("li", { text: d }); })),
      p.result ? el("p", { class: "d-result", text: p.result }) : null,
      p.tools && p.tools.length
        ? el("ul", { class: "d-tools", "aria-label": "Tools" }, p.tools.map(function (t) { return el("li", { text: t }); }))
        : null,
      p.links && p.links.length
        ? el("div", { class: "d-links" }, p.links.map(function (l) {
            var external = /^https?:/.test(l.href);
            var a = el("a", { href: l.href, text: l.label + " ↗" });
            if (external || /\.pdf$/i.test(l.href)) { a.target = "_blank"; a.rel = "noopener"; }
            return a;
          }))
        : null,
    ]);

    var figure = p.image
      ? el("figure", { class: "d-figure" }, [
          el("img", { src: p.image, alt: p.imageAlt || "", loading: "lazy", decoding: "async" }),
        ])
      : null;

    var detail = el("div", { class: "project-detail", id: detailId, hidden: "" }, [text, figure]);

    row.addEventListener("click", function () {
      var open = row.getAttribute("aria-expanded") === "true";
      row.setAttribute("aria-expanded", String(!open));
      detail.hidden = open;
      if (!open && history.replaceState) history.replaceState(null, "", "#project-" + p.id);
    });

    var item = el("li", { class: "project", id: "project-" + p.id }, [row, detail]);
    item.dataset.categories = (p.categories || []).join(" ");
    return item;
  }

  function matches(item) {
    return active === "all" || item.dataset.categories.split(" ").indexOf(active) !== -1;
  }

  function update() {
    var items = Array.prototype.slice.call(list.children);
    var matching = items.filter(matches);
    var limit = active === "all" && !expandedAll ? INITIAL : Infinity;
    items.forEach(function (item) { item.hidden = true; });
    matching.forEach(function (item, i) { item.hidden = i >= limit; });
    countEl.textContent = "(" + matching.length + ")";
    var hiddenCount = matching.length - Math.min(matching.length, limit);
    showAllBtn.hidden = hiddenCount <= 0;
    showAllBtn.textContent = "Show all " + matching.length + " projects";
  }

  function buildFilters() {
    var used = {};
    PROJECTS.forEach(function (p) { (p.categories || []).forEach(function (c) { used[c] = true; }); });
    var keys = ["all"].concat(Object.keys(CATEGORIES).filter(function (k) { return used[k]; }));
    keys.forEach(function (key) {
      var btn = el("button", {
        type: "button",
        class: "filter",
        "aria-pressed": key === active ? "true" : "false",
        text: key === "all" ? "All" : CATEGORIES[key],
      });
      btn.addEventListener("click", function () {
        active = key;
        Array.prototype.forEach.call(filtersEl.children, function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        update();
      });
      filtersEl.appendChild(btn);
    });
  }

  function openFromHash() {
    var m = location.hash.match(/^#project-(.+)$/);
    if (!m) return;
    var item = document.getElementById("project-" + m[1]);
    if (!item) return;
    expandedAll = true;
    update();
    var row = item.querySelector(".project-row");
    if (row.getAttribute("aria-expanded") !== "true") row.click();
    item.scrollIntoView();
  }

  // CV links: shown only when SITE.cv is set in projects.js
  document.querySelectorAll("[data-cv-link]").forEach(function (a) {
    if (SITE && SITE.cv) {
      a.href = SITE.cv;
      a.target = "_blank";
      a.rel = "noopener";
      a.hidden = false;
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  PROJECTS.forEach(function (p, i) { list.appendChild(buildProject(p, i)); });
  buildFilters();
  showAllBtn.addEventListener("click", function () { expandedAll = true; update(); });
  update();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
