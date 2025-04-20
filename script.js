(function () {
  let originalTitle = document.title;
  let isAppending = false;

  function getHostname() {
    if (window.location.href.startsWith("http")) {
      return window.location.hostname;
    }
    if (window.location.href.startsWith("file")) {
      return "_file";
    }
    return "_other";
  }

  function updateTitle() {
    if (isAppending) {
      return; // Prevent infinite loops if the observer triggers on our changes
    }

    const hostname = getHostname();
    const suffix = ` [${hostname}]`;

    if (!document.title.endsWith(suffix)) {
      isAppending = true;
      originalTitle = document.title; // Store the website's title before appending
      document.title = originalTitle + suffix;
      isAppending = false;
    }
  }

  function initializeObserver() {
    const titleTag = document.querySelector("head > title");
    if (titleTag) {
      const titleObserver = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.target === titleTag) {
            // Title has changed, re-append if necessary
            setTimeout(updateTitle, 10);
          }
        }
      });
      titleObserver.observe(titleTag, { childList: true });
      updateTitle();
    } else {
      // Keep trying if title tag isn't there yet
      setTimeout(initializeObserver, 50);
    }
  }

  initializeObserver();

  window.addEventListener("popstate", () => setTimeout(updateTitle, 10));
  window.addEventListener("hashchange", () => setTimeout(updateTitle, 10));

  const origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(this, arguments);
    setTimeout(updateTitle, 50);
  };

  const origReplaceState = history.replaceState;
  history.replaceState = function () {
    origReplaceState.apply(this, arguments);
    setTimeout(updateTitle, 50);
  };
})();
