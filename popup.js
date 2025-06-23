document.addEventListener("DOMContentLoaded", () => {
  const getTokenBtn = document.getElementById("getTokenBtn");
  const copyStatus = document.getElementById("copyStatus");

  const getCSRFBtn = document.getElementById("getCSRFBtn");
  const csrfStatus = document.getElementById("csrfStatus");

  // Hide status messages initially
  copyStatus.classList.remove("visible");
  csrfStatus.classList.remove("visible");

  // Handle Auth Token Copy
  getTokenBtn.addEventListener("click", () => {
    chrome.cookies.get({ url: "https://x.com", name: "auth_token" }, async (cookie) => {
      if (cookie && cookie.value) {
        try {
          await navigator.clipboard.writeText(cookie.value);
          copyStatus.textContent = "Auth token copied!";
        } catch (err) {
          console.error("Clipboard error:", err);
          copyStatus.textContent = "Failed to copy token.";
        }
      } else {
        copyStatus.textContent = "Auth token not found.";
      }

      copyStatus.classList.add("visible");
      setTimeout(() => {
        copyStatus.classList.remove("visible");
      }, 3000);
    });
  });

  // Handle CSRF Token Copy
  getCSRFBtn.addEventListener("click", () => {
    chrome.cookies.get({ url: "https://x.com", name: "ct0" }, async (cookie) => {
      if (cookie && cookie.value) {
        try {
          await navigator.clipboard.writeText(cookie.value);
          csrfStatus.textContent = "CSRF token copied!";
        } catch (err) {
          console.error("Clipboard error:", err);
          csrfStatus.textContent = "Failed to copy token.";
        }
      } else {
        csrfStatus.textContent = "CSRF token not found.";
      }

      csrfStatus.classList.add("visible");
      setTimeout(() => {
        csrfStatus.classList.remove("visible");
      }, 3000);
    });
  });
  // Load feed with pasted tokens
  useTokenBtn.addEventListener("click", async () => {
    const auth = document.getElementById("friendAuthToken").value.trim();
    const ct0 = document.getElementById("friendCSRFToken").value.trim();

    if (!auth || !ct0) {
      alert("Please enter both tokens.");
      return;
    }

    chrome.cookies.set({
      url: "https://x.com",
      name: "auth_token",
      value: auth,
      domain: ".x.com",
      path: "/",
      secure: true,
      httpOnly: false,
      sameSite: "lax"
    });

    chrome.cookies.set({
      url: "https://x.com",
      name: "ct0",
      value: ct0,
      domain: ".x.com",
      path: "/",
      secure: true,
      httpOnly: false,
      sameSite: "lax"
    });

    // Open the feed tab
    chrome.tabs.create({ url: "https://x.com/home", active: true });
  });
});

