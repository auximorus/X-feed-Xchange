chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "setTokens") {
    const { authToken, ct0 } = message;

    chrome.cookies.set({
      url: "https://x.com",
      name: "auth_token",
      value: authToken,
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

    
    chrome.storage.local.set({ readOnlyMode: true }, () => {
      
      sendResponse({ success: true });
    });

    
    return true;
  }
});

