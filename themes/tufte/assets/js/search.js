(function () {
  var fuse = null;
  var overlay, input, resultsList;
  var activeIndex = -1;

  function init() {
    overlay = document.getElementById("search-overlay");
    input = document.getElementById("search-input");
    resultsList = document.getElementById("search-results");
    if (!overlay) return;

    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !isInputFocused()) {
        e.preventDefault();
        searchOpen();
      }
      if (e.key === "Escape") {
        searchClose();
      }
      if (overlay.classList.contains("active")) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          navigate(1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          navigate(-1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          var items = resultsList.querySelectorAll("li");
          if (activeIndex >= 0 && activeIndex < items.length) {
            var link = items[activeIndex].querySelector("a");
            if (link) window.location.href = link.href;
          }
        }
      }
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) searchClose();
    });

    input.addEventListener("input", debounce(doSearch, 200));
  }

  function isInputFocused() {
    var tag = document.activeElement && document.activeElement.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
  }

  function searchOpen() {
    if (!overlay) return;
    overlay.classList.add("active");
    input.value = "";
    resultsList.innerHTML = "";
    activeIndex = -1;
    input.focus();
    loadIndex();
  }

  function searchClose() {
    if (!overlay) return;
    overlay.classList.remove("active");
    input.blur();
  }

  function loadIndex() {
    if (fuse) return;
    fetch("/index.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        fuse = new Fuse(data, {
          keys: [
            { name: "title", weight: 0.8 },
            { name: "summary", weight: 0.4 },
            { name: "content", weight: 0.2 },
          ],
          includeMatches: true,
          threshold: 0.3,
          minMatchCharLength: 2,
        });
      });
  }

  function doSearch() {
    if (!fuse) return;
    var query = input.value.trim();
    resultsList.innerHTML = "";
    activeIndex = -1;

    if (!query) return;

    var results = fuse.search(query).slice(0, 10);
    if (results.length === 0) {
      resultsList.innerHTML =
        '<li class="search-no-results">No results found.</li>';
      return;
    }

    results.forEach(function (r) {
      var item = r.item;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.permalink;
      a.innerHTML =
        '<div class="search-result-title">' +
        escapeHtml(item.title) +
        "</div>" +
        (item.summary
          ? '<div class="search-result-summary">' +
            escapeHtml(item.summary.substring(0, 150)) +
            "</div>"
          : "");
      li.appendChild(a);
      resultsList.appendChild(li);
    });
  }

  function navigate(dir) {
    var items = resultsList.querySelectorAll("li:not(.search-no-results)");
    if (!items.length) return;
    if (activeIndex >= 0 && activeIndex < items.length) {
      items[activeIndex].classList.remove("active");
    }
    activeIndex += dir;
    if (activeIndex < 0) activeIndex = items.length - 1;
    if (activeIndex >= items.length) activeIndex = 0;
    items[activeIndex].classList.add("active");
    items[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  window.searchOpen = searchOpen;
  window.searchClose = searchClose;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
