import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

const BASE_URL = "https://app.chatwoot.com";
const WEBSITE_TOKEN = "h8b2aaeAG66WrU7p6pW6GoZ2";
const CHATWOOT_SCRIPT_ID = "chatwoot-sdk-script";

export function ChatwootWidget() {
  useEffect(() => {
    let cancelled = false;

    const runChatwoot = () => {
      window.chatwootSDK?.run({
        websiteToken: WEBSITE_TOKEN,
        baseUrl: BASE_URL,
      });
    };

    const injectOrRun = () => {
      if (cancelled) return;

      if (window.chatwootSDK) {
        runChatwoot();
        return;
      }

      const existingScript = document.getElementById(CHATWOOT_SCRIPT_ID) as HTMLScriptElement | null;
      if (existingScript) {
        if (existingScript.getAttribute("data-loaded") === "true" || existingScript.readyState === "complete") {
          runChatwoot();
          return;
        }
        existingScript.addEventListener(
          "load",
          () => {
            runChatwoot();
          },
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.id = CHATWOOT_SCRIPT_ID;
      script.src = `${BASE_URL}/packs/js/sdk.js`;
      script.async = true;
      script.onload = () => {
        script.setAttribute("data-loaded", "true");
        runChatwoot();
      };

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    const scheduleAfterIdle = () => {
      if (cancelled) return;
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => injectOrRun(), { timeout: 5000 });
      } else {
        window.setTimeout(injectOrRun, 2000);
      }
    };

    if (document.readyState === "complete") {
      scheduleAfterIdle();
    } else {
      window.addEventListener("load", scheduleAfterIdle, { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

export default ChatwootWidget;
