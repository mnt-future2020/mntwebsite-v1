"use client";

import { useEffect, useState } from "react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// "Install app" affordance shown on the login screen. On Android/desktop Chrome
// it fires the native install prompt; on iOS (no beforeinstallprompt) it shows
// the Share → Add to Home Screen hint. Hides itself once the app is installed.
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [standalone, setStandalone] = useState(true); // assume installed until checked (avoids flash)
  const [iosHelp, setIosHelp] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(ua));
    const inStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setStandalone(inStandalone);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (standalone) return null;

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  // Android / desktop with a captured prompt.
  if (deferred) {
    return (
      <button
        type="button"
        onClick={install}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
      >
        <span aria-hidden="true">⬇</span> Install the app
      </button>
    );
  }

  // iOS: no programmatic prompt; guide the user.
  if (isIos) {
    return (
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setIosHelp((s) => !s)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slatey transition-colors hover:text-ink"
        >
          <span aria-hidden="true">⬇</span> Install on your phone
        </button>
        {iosHelp && (
          <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2.5 text-center text-xs text-slatey">
            Tap the <span className="font-semibold">Share</span> icon, then{" "}
            <span className="font-semibold">“Add to Home Screen”</span>.
          </p>
        )}
      </div>
    );
  }

  return null;
}
