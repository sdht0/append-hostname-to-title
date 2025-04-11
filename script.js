(function() {
  function updateTitle() {
    const currentTitle = document.title;

    var hostname = "_file";
    if (window.location.href.startsWith("http")) {
      hostname = window.location.hostname;
    }

    const suffix  = " [" + hostname + "]";
    if (!currentTitle.endsWith(suffix)) {
      document.title = currentTitle + suffix;
    }
  }

  // Update the title when the page loads
  updateTitle();

  // Listen for changes to the title element (for dynamic title updates)
  const titleObserver = new MutationObserver(updateTitle);
  titleObserver.observe(document.querySelector('head > title'), { childList: true });
})();
