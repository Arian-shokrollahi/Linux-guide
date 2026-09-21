(function () {
  "use strict";

  var docs = Array.isArray(window.LINUX_GUIDE_CONTENT) ? window.LINUX_GUIDE_CONTENT : [];
  var repoUrl = "https://github.com/Arian-shokrollahi/Linux-guide";
  var state = {
    currentPath: null,
    loadToken: 0,
    openGroups: new Set(),
    tocObserver: null
  };

  var elements = {
    body: document.body,
    menuButton: document.getElementById("menuButton"),
    sidebarScrim: document.getElementById("sidebarScrim"),
    themeButton: document.getElementById("themeButton"),
    searchInput: document.getElementById("searchInput"),
    searchMeta: document.getElementById("searchMeta"),
    docsNav: document.getElementById("docsNav"),
    landing: document.getElementById("landing"),
    documentView: document.getElementById("documentView"),
    errorView: document.getElementById("errorView"),
    article: document.getElementById("article"),
    breadcrumbs: document.getElementById("breadcrumbs"),
    documentMeta: document.getElementById("documentMeta"),
    pageNavigation: document.getElementById("pageNavigation"),
    tocPanel: document.getElementById("tocPanel"),
    tocNav: document.getElementById("tocNav"),
    editLink: document.getElementById("editLink"),
    readingProgress: document.getElementById("readingProgress"),
    backToTop: document.getElementById("backToTop"),
    toast: document.getElementById("toast"),
    startButton: document.getElementById("startButton"),
    continueButton: document.getElementById("continueButton"),
    statsRow: document.getElementById("statsRow"),
    topicGrid: document.getElementById("topicGrid")
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase("fa")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[ـ\u064B-\u065F]/g, "")
      .replace(/[^\p{L}\p{N}+#._-]+/gu, " ")
      .trim();
  }

  function encodeDocPath(path) {
    return String(path).split("/").map(encodeURIComponent).join("/");
  }

  function docHref(path) {
    return "#/doc/" + encodeURIComponent(path);
  }

  function getRoutePath() {
    var match = window.location.hash.match(/^#\/doc\/(.+)$/);
    if (!match) return null;
    try {
      return decodeURIComponent(match[1].split("#section-")[0]);
    } catch (error) {
      return null;
    }
  }

  function findDoc(path) {
    return docs.find(function (doc) { return doc.path === path; }) || null;
  }

  function closeMobileMenu() {
    elements.body.classList.remove("menu-open");
    elements.menuButton.setAttribute("aria-expanded", "false");
  }

  function setTheme(theme) {
    var nextTheme = theme === "light" ? "light" : "dark";
    elements.body.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("linux-guide-theme", nextTheme);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", nextTheme === "light" ? "#f4f7f4" : "#07110d");
  }

  function initTheme() {
    var saved = localStorage.getItem("linux-guide-theme");
    var preferred = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(saved || preferred);
  }

  function renderNavigation(query) {
    var normalizedQuery = normalize(query);
    var terms = normalizedQuery.split(/\s+/).filter(Boolean);
    var filtered = terms.length
      ? docs.filter(function (doc) {
          var haystack = doc.normalizedSearch || normalize([doc.title, doc.category, doc.path, doc.search].join(" "));
          return terms.every(function (term) { return haystack.indexOf(term) !== -1; });
        })
      : docs;

    var groups = new Map();
    filtered.forEach(function (doc) {
      if (!groups.has(doc.categoryKey)) groups.set(doc.categoryKey, { name: doc.category, docs: [] });
      groups.get(doc.categoryKey).docs.push(doc);
    });

    if (!state.openGroups.size && docs[0]) state.openGroups.add(docs[0].categoryKey);
    if (state.currentPath) {
      var current = findDoc(state.currentPath);
      if (current) state.openGroups.add(current.categoryKey);
    }

    var html = "";
    groups.forEach(function (group, key) {
      var isOpen = terms.length || state.openGroups.has(key);
      html += '<section class="nav-group' + (isOpen ? " is-open" : "") + '" data-group="' + escapeHtml(key) + '">';
      html += '<button class="nav-group-header" type="button" aria-expanded="' + String(isOpen) + '">';
      html += '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>';
      html += "<span>" + escapeHtml(group.name) + "</span><small>" + group.docs.length + "</small></button>";
      html += '<div class="nav-items">';
      group.docs.forEach(function (doc) {
        html += '<a class="nav-link' + (doc.path === state.currentPath ? " active" : "") + '" data-doc-path="' + escapeHtml(doc.path) + '" href="' + docHref(doc.path) + '">' + escapeHtml(doc.title) + "</a>";
      });
      html += "</div></section>";
    });

    elements.docsNav.innerHTML = html || '<div class="search-meta">نتیجه‌ای پیدا نشد؛ عبارت دیگری امتحان کن.</div>';
    elements.searchMeta.textContent = terms.length ? filtered.length.toLocaleString("fa-IR") + " نتیجه" : docs.length.toLocaleString("fa-IR") + " آموزش";
  }

  function renderLanding() {
    var categories = new Map();
    var totalWords = 0;
    docs.forEach(function (doc) {
      totalWords += Number(doc.words || 0);
      if (!categories.has(doc.categoryKey)) categories.set(doc.categoryKey, { key: doc.categoryKey, name: doc.category, docs: [] });
      categories.get(doc.categoryKey).docs.push(doc);
    });

    var estimatedHours = Math.max(1, Math.round(totalWords / 190 / 60));
    elements.statsRow.innerHTML = [
      ["$_", docs.length.toLocaleString("fa-IR"), "درس و راهنمای عملی"],
      ["./", categories.size.toLocaleString("fa-IR"), "فصل ساختاریافته"],
      ["~", estimatedHours.toLocaleString("fa-IR") + "+", "ساعت محتوای آموزشی"]
    ].map(function (item) {
      return '<div class="stat-card"><span class="stat-icon" dir="ltr">' + item[0] + '</span><div class="stat-copy"><strong>' + item[1] + "</strong><span>" + item[2] + "</span></div></div>";
    }).join("");

    var featuredKeys = [
      "00-0-Introduction-and-terms",
      "02-navigation",
      "09-permission",
      "10-processes",
      "14-package-managment",
      "16-networking",
      "23-shellscript-loop",
      "24-security-and-connection"
    ];
    var featured = featuredKeys.map(function (key) { return categories.get(key); }).filter(Boolean);
    if (!featured.length) featured = Array.from(categories.values()).slice(0, 8);

    elements.topicGrid.innerHTML = featured.map(function (group, index) {
      return '<button class="topic-card" type="button" data-topic-path="' + escapeHtml(group.docs[0].path) + '"><span class="topic-index">TOPIC_' + String(index + 1).padStart(2, "0") + '</span><strong>' + escapeHtml(group.name) + "</strong><small>" + group.docs.length.toLocaleString("fa-IR") + " مطلب آموزشی</small></button>";
    }).join("");

    var lastPath = localStorage.getItem("linux-guide-last-doc");
    var lastDoc = lastPath ? findDoc(lastPath) : null;
    elements.continueButton.hidden = !lastDoc;
    if (lastDoc) {
      elements.continueButton.textContent = "ادامه: " + lastDoc.title;
      elements.continueButton.dataset.path = lastDoc.path;
    }
  }

  function showLanding() {
    state.currentPath = null;
    state.loadToken += 1;
    elements.landing.hidden = false;
    elements.documentView.hidden = true;
    elements.errorView.hidden = true;
    elements.tocPanel.classList.add("is-empty");
    elements.readingProgress.style.width = "0";
    document.title = "Linux Guide | راهنمای فارسی لینوکس";
    renderNavigation(elements.searchInput.value);
    renderLanding();
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function showError() {
    elements.landing.hidden = true;
    elements.documentView.hidden = true;
    elements.errorView.hidden = false;
    elements.tocPanel.classList.add("is-empty");
    document.title = "صفحه پیدا نشد | Linux Guide";
  }

  function resolveRelativePath(baseFile, target) {
    if (!target || /^(?:[a-z]+:|\/|#)/i.test(target)) return target;
    var cleanTarget = target.split("#")[0].split("?")[0];
    try { cleanTarget = decodeURIComponent(cleanTarget); } catch (error) { /* keep original */ }
    var parts = baseFile.split("/").slice(0, -1);
    cleanTarget.split("/").forEach(function (part) {
      if (!part || part === ".") return;
      if (part === "..") parts.pop();
      else parts.push(part);
    });
    return parts.join("/");
  }

  function slugifyHeading(text, used) {
    var base = normalize(text).replace(/\s+/g, "-").replace(/^-+|-+$/g, "") || "section";
    var slug = base;
    var index = 2;
    while (used.has(slug)) {
      slug = base + "-" + index;
      index += 1;
    }
    used.add(slug);
    return slug;
  }

  function renderBreadcrumbs(doc) {
    elements.breadcrumbs.innerHTML = '<a href="#/">خانه</a><span class="separator">/</span><span>' + escapeHtml(doc.category) + '</span><span class="separator">/</span><span>' + escapeHtml(doc.title) + "</span>";
    var readingMinutes = Math.max(1, Math.ceil(Number(doc.words || 0) / 190));
    elements.documentMeta.innerHTML = "<span>" + readingMinutes.toLocaleString("fa-IR") + " دقیقه مطالعه</span><span>•</span><span>" + Number(doc.words || 0).toLocaleString("fa-IR") + " واژه</span>";
  }

  function renderPageNavigation(doc) {
    var currentIndex = docs.findIndex(function (item) { return item.path === doc.path; });
    var previous = currentIndex > 0 ? docs[currentIndex - 1] : null;
    var next = currentIndex >= 0 && currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;
    var html = "";
    if (previous) html += '<a class="page-nav-link" href="' + docHref(previous.path) + '"><small>درس قبلی →</small><strong>' + escapeHtml(previous.title) + "</strong></a>";
    else html += "<span></span>";
    if (next) html += '<a class="page-nav-link" href="' + docHref(next.path) + '"><small>← درس بعدی</small><strong>' + escapeHtml(next.title) + "</strong></a>";
    elements.pageNavigation.innerHTML = html;
  }

  function decorateArticle(doc) {
    var usedSlugs = new Set();
    var headings = Array.from(elements.article.querySelectorAll("h1, h2, h3"));
    headings.forEach(function (heading) {
      var slug = slugifyHeading(heading.textContent, usedSlugs);
      heading.id = slug;
      var anchor = document.createElement("button");
      anchor.className = "heading-anchor";
      anchor.type = "button";
      anchor.textContent = "#";
      anchor.setAttribute("aria-label", "کپی لینک این بخش");
      anchor.addEventListener("click", function () {
        var url = window.location.href.split("#section-")[0] + "#section-" + encodeURIComponent(slug);
        navigator.clipboard.writeText(url).then(function () { showToast("لینک بخش کپی شد"); });
      });
      heading.appendChild(anchor);
    });

    elements.article.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;
      if (href.charAt(0) === "#") {
        link.addEventListener("click", function (event) {
          var target = document.getElementById(href.slice(1));
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
        return;
      }
      if (/^(?:https?:|mailto:)/i.test(href)) {
        link.target = "_blank";
        link.rel = "noreferrer noopener";
        return;
      }
      var resolved = resolveRelativePath(doc.path, href);
      var matchingDoc = findDoc(resolved);
      if (matchingDoc) link.setAttribute("href", docHref(matchingDoc.path));
    });

    elements.article.querySelectorAll("img[src]").forEach(function (image) {
      var src = image.getAttribute("src");
      if (src && !/^(?:https?:|data:|\/)/i.test(src)) image.setAttribute("src", encodeDocPath(resolveRelativePath(doc.path, src)));
      image.loading = "lazy";
      image.decoding = "async";
    });

    elements.article.querySelectorAll("pre").forEach(function (pre) {
      if (pre.parentElement && pre.parentElement.classList.contains("code-shell")) return;
      var code = pre.querySelector("code");
      if (code && window.hljs) {
        try { window.hljs.highlightElement(code); } catch (error) { /* plain code is still readable */ }
      }
      var className = code ? code.className : "";
      var languageMatch = className.match(/language-([\w-]+)/);
      var language = languageMatch ? languageMatch[1] : "terminal";
      var shell = document.createElement("div");
      shell.className = "code-shell";
      var toolbar = document.createElement("div");
      toolbar.className = "code-toolbar";
      toolbar.innerHTML = '<span class="code-language">' + escapeHtml(language) + '</span><button class="copy-code" type="button">copy</button>';
      pre.parentNode.insertBefore(shell, pre);
      shell.appendChild(toolbar);
      shell.appendChild(pre);
      toolbar.querySelector("button").addEventListener("click", function (event) {
        navigator.clipboard.writeText(code ? code.textContent : pre.textContent).then(function () {
          event.currentTarget.textContent = "copied!";
          showToast("دستور کپی شد");
          window.setTimeout(function () { event.currentTarget.textContent = "copy"; }, 1400);
        });
      });
    });

    elements.article.querySelectorAll("table").forEach(function (table) {
      var wrapper = document.createElement("div");
      wrapper.className = "table-wrap";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    renderToc(headings.filter(function (heading) { return heading.tagName !== "H1"; }));
  }

  function renderToc(headings) {
    if (state.tocObserver) state.tocObserver.disconnect();
    if (!headings.length) {
      elements.tocPanel.classList.add("is-empty");
      elements.tocNav.innerHTML = "";
      return;
    }
    elements.tocPanel.classList.remove("is-empty");
    elements.tocNav.innerHTML = headings.map(function (heading) {
      var cleanText = heading.cloneNode(true);
      var anchor = cleanText.querySelector(".heading-anchor");
      if (anchor) anchor.remove();
      return '<a href="#' + encodeURIComponent(heading.id) + '" data-target="' + escapeHtml(heading.id) + '" data-level="' + heading.tagName.slice(1) + '">' + escapeHtml(cleanText.textContent) + "</a>";
    }).join("");

    elements.tocNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var target = document.getElementById(link.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });

    if ("IntersectionObserver" in window) {
      state.tocObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          elements.tocNav.querySelectorAll("a").forEach(function (link) {
            link.classList.toggle("active", link.dataset.target === entry.target.id);
          });
        });
      }, { rootMargin: "-90px 0px -70% 0px", threshold: 0 });
      headings.forEach(function (heading) { state.tocObserver.observe(heading); });
    }
  }

  function parseMarkdown(source) {
    if (!window.marked || !window.DOMPurify) throw new Error("Markdown libraries are unavailable");
    window.marked.setOptions({ gfm: true, breaks: false, pedantic: false });
    return window.DOMPurify.sanitize(window.marked.parse(source), {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"]
    });
  }

  async function loadDocument(path) {
    var doc = findDoc(path);
    if (!doc) {
      showError();
      return;
    }

    var token = ++state.loadToken;
    state.currentPath = path;
    elements.landing.hidden = true;
    elements.errorView.hidden = true;
    elements.documentView.hidden = false;
    elements.article.innerHTML = '<div class="loading-document"><span>loading document</span></div>';
    elements.pageNavigation.innerHTML = "";
    elements.tocPanel.classList.add("is-empty");
    renderNavigation(elements.searchInput.value);
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "auto" });

    try {
      var response = await fetch(encodeDocPath(path), { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      var markdown = await response.text();
      if (token !== state.loadToken) return;
      elements.article.innerHTML = parseMarkdown(markdown);
      renderBreadcrumbs(doc);
      renderPageNavigation(doc);
      decorateArticle(doc);
      elements.editLink.href = repoUrl + "/edit/master/" + encodeDocPath(path);
      document.title = doc.title + " | Linux Guide";
      localStorage.setItem("linux-guide-last-doc", path);
      updateActiveNavigation();
      var sectionMatch = window.location.hash.match(/#section-(.+)$/);
      if (sectionMatch) {
        var section = document.getElementById(decodeURIComponent(sectionMatch[1]));
        if (section) window.setTimeout(function () { section.scrollIntoView(); }, 0);
      }
    } catch (error) {
      if (token !== state.loadToken) return;
      elements.article.innerHTML = '<div class="error-view" style="display:grid"><span class="error-code">!</span><h1>نمایش فایل ممکن نشد.</h1><p>برای اجرای محلی، سایت را با یک وب‌سرور باز کن؛ باز کردن مستقیم index.html کافی نیست.</p></div>';
      elements.tocPanel.classList.add("is-empty");
      console.error(error);
    }
  }

  function updateActiveNavigation() {
    elements.docsNav.querySelectorAll(".nav-link").forEach(function (link) {
      link.classList.toggle("active", link.dataset.docPath === state.currentPath);
    });
    var active = elements.docsNav.querySelector(".nav-link.active");
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  function handleRoute() {
    var path = getRoutePath();
    if (path) loadDocument(path);
    else showLanding();
  }

  var toastTimer;
  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("visible");
    toastTimer = window.setTimeout(function () { elements.toast.classList.remove("visible"); }, 1800);
  }

  function updateScrollUi() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var progress = state.currentPath && scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
    elements.readingProgress.style.width = progress + "%";
    elements.backToTop.classList.toggle("visible", window.scrollY > 500);
  }

  function bindEvents() {
    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("scroll", updateScrollUi, { passive: true });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMobileMenu();
    });

    elements.themeButton.addEventListener("click", function () {
      setTheme(elements.body.dataset.theme === "dark" ? "light" : "dark");
    });
    elements.menuButton.addEventListener("click", function () {
      var open = elements.body.classList.toggle("menu-open");
      elements.menuButton.setAttribute("aria-expanded", String(open));
    });
    elements.sidebarScrim.addEventListener("click", closeMobileMenu);
    elements.searchInput.addEventListener("input", function () { renderNavigation(elements.searchInput.value); });

    elements.docsNav.addEventListener("click", function (event) {
      var header = event.target.closest(".nav-group-header");
      if (!header) return;
      var group = header.closest(".nav-group");
      var key = group.dataset.group;
      var willOpen = !group.classList.contains("is-open");
      group.classList.toggle("is-open", willOpen);
      header.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) state.openGroups.add(key);
      else state.openGroups.delete(key);
    });

    elements.startButton.addEventListener("click", function () {
      if (docs[0]) window.location.hash = docHref(docs[0].path).slice(1);
    });
    elements.continueButton.addEventListener("click", function () {
      if (elements.continueButton.dataset.path) window.location.hash = docHref(elements.continueButton.dataset.path).slice(1);
    });
    elements.topicGrid.addEventListener("click", function (event) {
      var card = event.target.closest("[data-topic-path]");
      if (card) window.location.hash = docHref(card.dataset.topicPath).slice(1);
    });
    elements.backToTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    document.addEventListener("keydown", function (event) {
      if (event.key === "/" && document.activeElement !== elements.searchInput && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        event.preventDefault();
        elements.searchInput.focus();
        if (window.innerWidth <= 760) {
          elements.body.classList.add("menu-open");
          elements.menuButton.setAttribute("aria-expanded", "true");
        }
      }
      if (event.key === "Escape") {
        closeMobileMenu();
        elements.searchInput.blur();
      }
    });
  }

  function init() {
    initTheme();
    bindEvents();
    renderNavigation("");
    renderLanding();
    handleRoute();
    if (!docs.length) elements.searchMeta.textContent = "فهرست محتوا ساخته نشده است.";
  }

  init();
})();
