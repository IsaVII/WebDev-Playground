import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CONSENT_KEY = "cookieConsentGiven";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user has already seen the notice
    const consentGiven = localStorage.getItem(CONSENT_KEY);
    if (!consentGiven) {
      // Small delay for better UX - show after page loads
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setShow(false);
  };

  const handleDecline = () => {
    // Even if they decline, we still need to remember they saw it
    // (otherwise the banner would show every time)
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);

    // Optional: You could also clear any existing cookies here
    // But note that the app functionality will be limited without them
    alert(t("cookie.message"));
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />

      {/* Modal */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-surface shadow-2xl rounded-lg z-50 animate-slide-up"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl" role="img" aria-label="cookie">
              🍪
            </span>
            <div>
              <h2 className="text-lg font-semibold text-heading mb-2">
                Cookie Notice
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {t("cookie.message")}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2.5 font-medium rounded-lg transition-all hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
              }}
            >
              {t("cookie.accept")}
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2.5 border-2 font-medium rounded-lg transition-colors bg-surface-alt hover:bg-surface-alt-hover"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-h)",
              }}
            >
              {t("cookie.decline")}
            </button>
          </div>

          <Link
            to="/cookie-policy"
            className="block mt-3 text-center text-sm hover:underline"
            style={{ color: "var(--link-color)" }}
            onClick={handleAccept}
          >
            {t("cookie.learnMore")}
          </Link>
        </div>
      </div>
    </>
  );
}
