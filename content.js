chrome.storage.local.get('readOnlyMode', ({ readOnlyMode }) => {
  if (!readOnlyMode) return;

  function disableAllButtonsAndLinks() {
    document.querySelectorAll('a, button').forEach(el => {
      el.onclick = (e) => e.preventDefault();
      el.style.pointerEvents = 'none';
      el.style.opacity = '0.4';
    });
  }

  function hideSpecificElements() {
    // Hide tweet post box
    document.querySelectorAll('div[aria-label="Tweet text"]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-testid="tweetButtonInline"]').forEach(el => el.style.display = 'none');

    // Hide "Show more" buttons
    document.querySelectorAll('span').forEach(el => {
      if (el.textContent.trim() === 'Show more') {
        const parent = el.closest('a, div[role="button"]');
        if (parent) parent.style.display = 'none';
      }
    });

    // Hide the three-dot buttons
    document.querySelectorAll('svg').forEach(svg => {
      if (svg.getAttribute('viewBox') === '0 0 24 24' &&
        svg.innerHTML.includes('M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9')) {
        const parent = svg.closest('div[role="button"], button');
        if (parent) parent.style.display = 'none';
      }
    });
  }

  function observerCallback() {
    disableAllButtonsAndLinks();
    hideSpecificElements();
  }

  const observer = new MutationObserver(observerCallback);
  observer.observe(document.body, { childList: true, subtree: true });

  observerCallback();

  // Remove flag on tab close/reload
  window.addEventListener("beforeunload", () => {
    chrome.storage.local.remove("readOnlyMode");
  });
});

