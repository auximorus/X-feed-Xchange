function applyReadOnlyMode() {
  function hideElementsCompletely() {
    const left = document.querySelector('header[role="banner"]');
    if (left) left.style.display = 'none';

    const topBar = document.querySelector('[aria-label="Timeline: Your Home Timeline"]')?.parentElement?.previousElementSibling;
    if (topBar) topBar.style.display = 'none';

    const right = document.querySelector('div[class*="r-ttdzmv"]');
    if (right) right.style.display = 'none';
  }

  function disableAllInteractions() {
    document.querySelectorAll('a, button').forEach(el => {
      el.onclick = (e) => e.preventDefault();
      el.style.pointerEvents = 'none';
      el.style.opacity = '0.4';
    });
  }
