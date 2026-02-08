(function () {
  var stored = localStorage.getItem("theme");
  var theme;
  if (stored === "dark" || stored === "light") {
    theme = stored;
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  } else {
    theme = "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
  updateIcon(theme);

  window.toggleTheme = function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon(next);
  };

  function updateIcon(t) {
    // Update after DOM is ready
    function doUpdate() {
      var el = document.querySelector(".theme-icon");
      if (el) {
        // Sun for dark mode (click to go light), moon for light mode (click to go dark)
        el.textContent = t === "dark" ? "\u2600" : "\u263D";
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", doUpdate);
    } else {
      doUpdate();
    }
  }
})();
