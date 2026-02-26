import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CONSENT_KEY = "univesia_cookie_consent";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => { localStorage.setItem(CONSENT_KEY, "accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem(CONSENT_KEY, "declined"); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="container mx-auto max-w-3xl">
        <div className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-primary/20">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {t("cookie.message")}{" "}
              <Link to="/privacidade" className="text-primary hover:underline">{t("cookie.privacyLink")}</Link>.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={decline} className="glass-btn px-4 py-2 rounded-full text-xs font-medium">{t("cookie.decline")}</button>
            <button onClick={accept} className="gradient-btn px-4 py-2 rounded-full text-xs font-semibold">{t("cookie.accept")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
