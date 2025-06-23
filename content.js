function disableAllButtonsAndLinks() {
  document.querySelectorAll('a, button').forEach(el => {
    el.onclick = (e) => e.preventDefault();
    el.style.pointerEvents = 'none';
    el.style.opacity = '0.4';
  });
}

