document.addEventListener("DOMContentLoaded", () => {
  const getTokenBtn = document.getElementById("getTokenBtn");
  const copyStatus = document.getElementById("copyStatus");

  // Hide status initially
  copyStatus.classList.remove("visible");

  getTokenBtn.addEventListener("click", () => {
    chrome.cookies.get({ url: "https://x.com", name: "auth_token" }, async (cookie) => {
      if (cookie && cookie.value) {
        const token = cookie.value;
        try {
          await navigator.clipboard.writeText(token);
          copyStatus.textContent = "Token copied!";
        } catch (err) {
          console.error("Clipboard error:", err);
          copyStatus.textContent = "Failed to copy token.";
        }
      } else {
        copyStatus.textContent = "Token not found.";
      }

      // Show the status
      copyStatus.classList.add("visible");

      // Hide after 3 seconds
      setTimeout(() => {
        copyStatus.classList.remove("visible");
      }, 3000);
    });
  });
});

