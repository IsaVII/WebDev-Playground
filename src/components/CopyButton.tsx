import { useEffect, useRef, useState } from "react";

/**
 * Small icon-only button that copies `text` to the clipboard when clicked,
 * showing a brief "Copied!" confirmation state before reverting.
 *
 * Uses the async Clipboard API when available (requires a secure context -
 * https or localhost) and falls back to a hidden <textarea> +
 * document.execCommand("copy") otherwise, so it still works on http/older
 * browsers.
 **/
function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const fallbackCopy = (value) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    // Keep it off-screen and out of the tab order.
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // If the async API rejects (e.g. permission denied) try the
      // fallback before giving up silently.
      try {
        fallbackCopy(text);
        setCopied(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
      } catch {
        // Nothing more we can do - leave the UI as-is.
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
      title={copied ? "Copied!" : "Copy"}
      className={`inline-flex items-center gap-1.5 rounded border border-line bg-surface/90 px-2 py-1 text-xs font-mono text-muted backdrop-blur-sm transition-colors hover:text-heading hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      {copied ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 text-green-500"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-green-500">Copied!</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h8a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default CopyButton;
