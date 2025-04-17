(function () {
  function updateTitle() {
    const currentTitle = document.title;

    var hostname = "_file";
    if (window.location.href.startsWith("http")) {
      hostname = window.location.hostname;
    }

    const suffix = " [" + hostname + "]";
    if (!currentTitle.endsWith(suffix)) {
      document.title = currentTitle + suffix;
    }
  }

  function waitForTitle() {
    const titleTag = document.querySelector("head > title");

    if (titleTag) {
      updateTitle();

      // Observe <title> changes
      const titleObserver = new MutationObserver(updateTitle);
      titleObserver.observe(titleTag, { childList: true });
    } else {
      setTimeout(waitForTitle, 50);
    }
  }

  waitForTitle();

  window.addEventListener("popstate", updateTitle);
  window.addEventListener("hashchange", updateTitle);

  const origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(this, arguments);
    setTimeout(updateTitle, 50);
  };
})();
